import React, { useState } from 'react';
import { Search, Loader2, FileText, AlertCircle } from 'lucide-react';

interface SearchResult {
    id?: string;
    score: number;
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

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResults(null);

        try {
            // Assuming the worker is deployed at this URL. 
            // If running locally, you might need to change this or use a proxy.
            const response = await fetch('https://pinecone-cgr.sherparq.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: query }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ocurrió un error al buscar la normativa.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Buscador de Normativa</h1>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                        Accede a la normativa chilena relevante para tus proyectos mediante búsqueda semántica avanzada.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="mb-12">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-2xl shadow-sm">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Describe lo que buscas (ej: requisitos de seguridad para almacenamiento de sustancias peligrosas...)"
                                className="w-full px-6 py-5 text-lg bg-transparent rounded-2xl focus:outline-none text-zinc-800 placeholder-zinc-400"
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
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-8 border border-red-100 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {results && results.result && results.result.hits && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-zinc-900">Resultados Relevantes</h2>
                            <span className="text-sm text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                                {results.result.hits.length} documentos encontrados
                            </span>
                        </div>

                        {results.result.hits.map((hit, index) => (
                            <div
                                key={hit.id || index}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-all duration-200 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-zinc-50 rounded-lg text-zinc-600 group-hover:bg-zinc-100 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-500">
                                            ID: {hit.id || 'N/A'}
                                        </span>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${hit.score > 0.8 ? 'bg-green-100 text-green-800' :
                                            hit.score > 0.7 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-zinc-100 text-zinc-800'
                                        }`}>
                                        Relevancia: {(hit.score * 100).toFixed(1)}%
                                    </span>
                                </div>

                                <div className="prose prose-zinc max-w-none">
                                    <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap">
                                        {/* Try to display the most relevant text field */}
                                        {hit.fields?.text || hit.fields?.chunk_text || hit.fields?.content || hit.metadata?.text || JSON.stringify(hit.fields || hit.metadata)}
                                    </p>
                                </div>

                                {/* Display other fields if available as tags or small details */}
                                {(hit.fields || hit.metadata) && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {Object.entries(hit.fields || hit.metadata || {})
                                            .filter(([key]) => !['text', 'chunk_text', 'content'].includes(key))
                                            .map(([key, value]) => (
                                                <span key={key} className="text-xs text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-100 truncate max-w-[200px]">
                                                    <span className="font-semibold">{key}:</span> {String(value)}
                                                </span>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
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
