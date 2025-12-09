import React, { useState, useMemo } from 'react';
import { Search, Loader2, FileText, AlertCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchResult {
    id?: string;
    score?: number;
    _id?: string;
    _score?: number;
    fields?: Record<string, any>;
    metadata?: Record<string, any>;
}

interface PineconeResponse {
    result: {
        hits: SearchResult[];
    };
}

export const Normativa: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PineconeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [availableFields, setAvailableFields] = useState<string[]>([]);
    const [isFieldSelectorOpen, setIsFieldSelectorOpen] = useState(false);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [reportContent, setReportContent] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResults(null);
        setReportContent(null);
        setAvailableFields([]);
        // Do NOT reset selectedFields here to persist user selection

        try {
            const response = await fetch('https://pinecone-cgr.abogado.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: query }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText} `);
            }

            const data = await response.json();
            setResults(data);

            // Extract all unique keys from hits
            if (data.result && data.result.hits) {
                const keys = new Set<string>();
                data.result.hits.forEach((hit: SearchResult) => {
                    const source = hit.fields || hit.metadata || {};
                    Object.keys(source).forEach(k => keys.add(k));
                });
                const allKeys = Array.from(keys);
                setAvailableFields(allKeys);

                // Only set default selection if the user hasn't selected anything yet
                if (selectedFields.length === 0) {
                    // Default selection: try to pick 'Resumen', 'materia', 'titulo', 'text', 'content' if they exist
                    const defaults = ['Resumen', 'materia', 'titulo', 'text', 'content', 'chunk_text'];
                    const initialSelection = allKeys.filter(k => defaults.includes(k));

                    // If no default keys found, pick the first 3
                    if (initialSelection.length === 0) {
                        setSelectedFields(allKeys.slice(0, 3));
                    } else {
                        setSelectedFields(initialSelection);
                    }
                }
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ocurrió un error al buscar la normativa.');
        } finally {
            setLoading(false);
        }
    };

    const toggleField = (field: string) => {
        setSelectedFields(prev =>
            prev.includes(field)
                ? prev.filter(f => f !== field)
                : [...prev, field]
        );
    };

    const toggleAllFields = () => {
        if (selectedFields.length === availableFields.length) {
            setSelectedFields([]);
        } else {
            setSelectedFields(availableFields);
        }
    };

    const handleGenerateReport = async () => {
        if (!results?.result?.hits || results.result.hits.length === 0) return;

        setGeneratingReport(true);
        setReportContent(null);

        try {
            const context = results.result.hits.map((hit, index) => {
                const source = hit.fields || hit.metadata || {};
                const rawScore = hit._score ?? hit.score;
                const score = typeof rawScore === 'number' ? (rawScore * 100).toFixed(1) + '%' : 'N/A';

                return `
Dictamen ${index + 1} (Relevancia: ${score}):
- Título: ${source.titulo || 'N/A'}
- Resumen: ${source.Resumen || 'N/A'}
- Materia: ${source.materia || 'N/A'}
- Descriptores Originales: ${source.descriptores_originales || 'N/A'}
- Análisis: ${source.analisis || 'N/A'}
- Descriptores AI: ${source.descriptores_AI || 'N/A'}
`;
            }).join('\n-------------------\n');

            const systemPrompt = "Eres un abogado experto en normativa administrativa. Tu tarea es elaborar un informe jurídico que responda a la consulta del usuario basándote EXCLUSIVAMENTE en los dictámenes proporcionados en el contexto. Cita los dictámenes relevantes por su título o materia.";

            const userMessage = `Consulta del usuario: "${query}"\n\nContexto Normativo (Dictámenes más relevantes):\n${context}\n\nPor favor, emite un informe jurídico detallado respondiendo a la consulta.`;

            const response = await fetch('https://one-shot-chatgpt.abogado.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userMessage,
                    systemPrompt
                }),
            });

            if (!response.ok) {
                throw new Error('Error al generar el informe');
            }

            const data = await response.json();
            // The worker returns OpenAI response format, usually choices[0].message.content
            // Based on the worker code: return new Response(JSON.stringify(data)... where data is from openai
            const content = data.choices?.[0]?.message?.content || "No se pudo generar el informe.";
            setReportContent(content);

        } catch (err) {
            console.error(err);
            setReportContent("Hubo un error al generar el informe. Por favor intente nuevamente.");
        } finally {
            setGeneratingReport(false);
        }
    };

    // Sort selected fields to ensure 'titulo' comes first
    const sortedSelectedFields = useMemo(() => {
        return [...selectedFields].sort((a, b) => {
            if (a === 'titulo') return -1;
            if (b === 'titulo') return 1;
            return 0;
        });
    }, [selectedFields]);

    return (
        <div className="min-h-screen bg-zinc-50 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Dictámenes Contraloria</h1>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                        Accede a la normativa de la Contraloria General de la República mediante búsqueda avanzada
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-8 max-w-4xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-2xl shadow-sm">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ej: Requisitos seguridad sustancias peligrosas..."
                                className="w-full pl-6 pr-20 sm:pr-40 py-5 text-lg bg-transparent rounded-2xl focus:outline-none text-zinc-800 placeholder-zinc-400"
                            />
                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className="absolute right-2 top-2 bottom-2 px-6 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 font-medium"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
                                <span className="hidden sm:inline">Buscar</span>
                            </button>
                        </div>
                    </div>
                </form>

                {error && (
                    <div className="max-w-4xl mx-auto p-4 bg-red-50 text-red-700 rounded-xl mb-8 border border-red-100 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {results && results.result && results.result.hits && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Field Selector */}
                        <div className="mb-8 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                            <button
                                onClick={() => setIsFieldSelectorOpen(!isFieldSelectorOpen)}
                                className="flex items-center justify-between w-full text-left font-medium text-zinc-700 hover:text-zinc-900"
                            >
                                <span className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-zinc-500" />
                                    Seleccionar campos a mostrar ({selectedFields.length})
                                </span>
                                {isFieldSelectorOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {isFieldSelectorOpen && (
                                <div className="mt-4 pt-4 border-t border-zinc-100">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <button
                                            onClick={toggleAllFields}
                                            className="text-xs font-medium px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md text-zinc-700 transition-colors"
                                        >
                                            {selectedFields.length === availableFields.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {availableFields.map(field => (
                                            <label key={field} className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer hover:text-zinc-900">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFields.includes(field)}
                                                    onChange={() => toggleField(field)}
                                                    className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                                                />
                                                <span className="truncate" title={field}>{field}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-zinc-900">Resultados Relevantes</h2>
                            <span className="text-sm text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                                {results.result.hits.length} documentos encontrados
                            </span>
                        </div>

                        <div className="space-y-6">
                            {results.result.hits.map((hit, index) => {
                                const source = hit.fields || hit.metadata || {};
                                // Handle both id/_id and score/_score
                                const id = hit._id || hit.id || 'N/A';
                                const rawScore = hit._score ?? hit.score;
                                const score = typeof rawScore === 'number' ? (rawScore * 100).toFixed(1) : 'N/A';

                                return (
                                    <div
                                        key={id || index}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-all duration-200 group"
                                    >
                                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-zinc-50">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-zinc-50 rounded-lg text-zinc-600 group-hover:bg-zinc-100 transition-colors">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-medium text-zinc-500 font-mono">
                                                    Dictámen N°: {id !== 'N/A' ? (
                                                        <a
                                                            href={`https://www.contraloria.cl/buscadorpdf/dictamenes/${id}/html`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {id}
                                                        </a>
                                                    ) : (
                                                        id
                                                    )}
                                                </span>
                                            </div>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${score !== 'N/A' && Number(score) > 80 ? 'bg-green-100 text-green-800' :
                                                score !== 'N/A' && Number(score) > 70 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-zinc-100 text-zinc-800'
                                                }`}>
                                                Relevancia: {score}%
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {sortedSelectedFields.length > 0 ? (
                                                sortedSelectedFields.map(field => {
                                                    const value = source[field];
                                                    if (value === undefined || value === null) return null;

                                                    return (
                                                        <div key={field} className="group/field">
                                                            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 group-hover/field:text-zinc-600 transition-colors">
                                                                {field}
                                                            </h3>
                                                            <div className="text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-50/50 p-3 rounded-lg border border-zinc-100/50">
                                                                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-zinc-400 italic text-center py-4">Selecciona campos para visualizar la información</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Report Generation Section */}
                        <div className="mt-12 pt-8 border-t border-zinc-200">
                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={handleGenerateReport}
                                    disabled={generatingReport}
                                    className="px-8 py-4 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {generatingReport ? (
                                        <>
                                            <Loader2 className="animate-spin w-6 h-6" />
                                            Generando informe jurídico...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-6 h-6" />
                                            Emite informe
                                        </>
                                    )}
                                </button>

                                {reportContent && (
                                    <div className="w-full bg-white p-8 rounded-2xl border border-zinc-200 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                                            <FileText className="w-6 h-6 text-zinc-700" />
                                            Informe Jurídico Generado
                                        </h3>
                                        <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed whitespace-pre-wrap">
                                            {reportContent}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {results && results.result && results.result.hits.length === 0 && (
                    <div className="text-center py-12 text-zinc-500">
                        <p>No se encontraron resultados para tu búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
