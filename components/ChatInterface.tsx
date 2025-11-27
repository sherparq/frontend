import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const WORKER_URL = "https://sherparq-backend.abogado.workers.dev";

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', content: 'Bienvenido a SherpARQ. Soy su consultor automatizado, enfocado en normativa DOM, minería y viabilidad técnica. ¿Cuál es su consulta?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage })
            });

            const data = await response.json();
            const botResponse = data.choices?.[0]?.message?.content || "Disculpa, hubo un problema al procesar la respuesta.";

            setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Error de conexión con el consultor. Revisa la URL del Worker.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="bg-sherp-black text-white p-4 flex items-center gap-3">
                <Bot className="w-6 h-6 text-[#f17b2c]" />
                <div>
                    <h3 className="font-medium">Consultor SherpARQ</h3>
                    <p className="text-xs text-gray-400">IA Especialista en Normativa y Minería</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-neutral-950">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user'
                                ? 'bg-[#f17b2c] text-white rounded-br-none'
                                : 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                            }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 rounded-bl-none flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-[#f17b2c]" />
                            <span className="text-xs text-gray-500">Analizando normativa...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escriba aquí su consulta técnica..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#f17b2c] dark:text-white"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-[#f17b2c] text-white rounded-md hover:bg-[#d86820] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
