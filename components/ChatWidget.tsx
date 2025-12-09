import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isContext?: boolean;
  source?: 'click' | 'auto';
}

export interface SelectedContext {
  type: 'regulation' | 'project' | 'service' | 'partner' | 'value' | 'contact_form';
  id: string;
  title: string;
}

interface ChatWidgetProps {
  activeSection?: string;
  selectedContext?: SelectedContext | null;
  onContextSelect?: (context: SelectedContext | null) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ activeSection, selectedContext, onContextSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hola. Soy la IA de SherpARQ. ¿En qué solución técnica o regulatoria puedo asistirte hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [previousSection, setPreviousSection] = useState(activeSection);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Trigger when a specific context is selected
  useEffect(() => {
    if (!selectedContext) return;

    let messageContent = '';
    if (selectedContext.type === 'regulation') {
      messageContent = `Veo que te interesa la norma **${selectedContext.title}**. ¿Quieres saber más detalles sobre su aplicación en proyectos?`;
    } else if (selectedContext.type === 'project') {
      messageContent = `El proyecto **${selectedContext.title}** es un gran ejemplo de nuestra experiencia. ¿Te gustaría saber más sobre los desafíos técnicos que resolvimos?`;
    } else if (selectedContext.type === 'service') {
      messageContent = `¿Te interesa nuestro servicio de **${selectedContext.title}**? Puedo explicarte cómo aporta valor a tu operación.`;
    } else if (selectedContext.type === 'partner') {
      messageContent = `Hemos trabajado exitosamente con **${selectedContext.title}**. ¿Te gustaría conocer nuestra experiencia en proyectos similares?`;
    } else if (selectedContext.type === 'value') {
      messageContent = `La **${selectedContext.title}** es fundamental para nosotros. ¿Quieres saber cómo la aplicamos en cada proyecto?`;
    } else if (selectedContext.type === 'contact_form') {
      messageContent = `Estoy listo, para empezar, ¿Podrías indicarme tu nombre, email, el tipo de proyecto o la consulta que necesitas evaluar?`;
    }

    const contextMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: messageContent,
      isContext: true,
      source: 'click'
    };

    setMessages(prev => {
      // Keep the first greeting message (index 0)
      const [first, ...rest] = prev;
      // Remove any previous context messages
      const filtered = rest.filter(m => !m.isContext);
      return [first, ...filtered, contextMessage];
    });

    setIsOpen(true);

    // We do NOT reset selectedContext immediately here to allow it to persist as "active"
    // But if we want to allow re-clicking the same item, we might need to.
    // However, keeping it allows us to know we are in a "specific" context.
    // Let's reset it via the parent prop if needed, but for local logic, 
    // we can rely on the message 'source' property.
    if (onContextSelect) {
      onContextSelect(null);
    }
  }, [selectedContext, onContextSelect]);

  // Alternative B: Section change detection with smooth transitions
  useEffect(() => {
    if (!isOpen) return;
    if (activeSection === previousSection) return;

    const lastMsg = messages[messages.length - 1];

    // Only proceed if there's a context message to replace
    if (!lastMsg?.isContext) {
      setPreviousSection(activeSection);
      return;
    }

    // Start fade-out transition
    setIsFading(true);

    // After 1s fade-out, update the message
    const fadeTimer = setTimeout(() => {
      let contextContent = '';
      if (activeSection === 'portfolio') contextContent = 'Estás viendo nuestra selección de proyectos. ¿Te gustaría conocer detalles de alguno en particular?';
      else if (activeSection === 'services') contextContent = '¿Buscas una solución específica entre nuestros servicios?';
      else if (activeSection === 'contact') contextContent = '¿Listo para iniciar tu proyecto? Hablemos.';
      else if (activeSection === 'about') contextContent = 'Conoce nuestra trayectoria y pilares estratégicos.';
      else if (activeSection === 'compliance') contextContent = 'Haz clic en una norma para obtener ayuda específica.';
      else if (activeSection === 'about') contextContent = 'Conoce nuestra trayectoria y pilares estratégicos.';
      else if (activeSection === 'compliance') contextContent = 'Haz clic en una norma para obtener ayuda específica.';
      // Removed generic home message as requested to avoid redundancy

      if (contextContent) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.isContext) {
            const newMessage: Message = {
              id: Date.now().toString(),
              role: 'assistant',
              content: contextContent,
              isContext: true,
              source: 'auto'
            };
            return [...prev.slice(0, -1), newMessage];
          }
          return prev;
        });
      } else {
        // Remove context message if no content for this section
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.isContext) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      }

      // End fade, start fade-in
      setIsFading(false);
      setPreviousSection(activeSection);
    }, 1000); // 1s fade-out duration

    return () => clearTimeout(fadeTimer);
  }, [activeSection, isOpen, messages, previousSection]);

  // Reset chat when closed
  useEffect(() => {
    if (!isOpen) {
      // Reset to initial state
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Hola. Soy la IA de SherpARQ. ¿Qué solución técnica o regulatoria necesitas implementar?'
        }
      ]);
      setPreviousSection(activeSection);
      setIsFading(false);
    }
  }, [isOpen, activeSection]);

  const suggestions = [
    "Tramitación de permisos DOM",
    "Modelado 3D y Geomática",
    "Seguridad Industrial HSE",
    "Optimización de Layouts"
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Llamada real al Cloudflare Worker
      const apiUrl = import.meta.env.VITE_API_URL || 'https://one-shot-chatgpt.abogado.workers.dev';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: text })
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      // Extraer el contenido de la respuesta de OpenAI
      const aiContent = data.choices?.[0]?.message?.content ||
        "Lo siento, hubo un problema al procesar tu consulta. Por favor intenta nuevamente o contectános a contacto@sherparq.cl";

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Lo siento, hubo un error de conexión. Por favor intenta contactarnos directamente al correo contacto@sherparq.cl"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-zinc-200 flex flex-col mb-4 overflow-hidden animate-fade-in-up origin-bottom-right">

          {/* Header */}
          <div className="bg-zinc-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <Sparkles size={16} className="text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm">SherpARQ AI</h3>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 bg-zinc-50 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} ${msg.isContext && isFading && index === messages.length - 1
                  ? 'opacity-0 transition-opacity duration-1000'
                  : 'opacity-100 transition-opacity duration-1000'
                  }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-zinc-900 text-white rounded-tr-none'
                    : 'bg-white border border-zinc-200 text-zinc-700 rounded-tl-none shadow-sm'
                    }`}
                >
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) =>
                    part.startsWith('**') && part.endsWith('**') ? (
                      <strong key={i} className="font-bold text-zinc-900">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-zinc-400" />
                  <span className="text-xs text-zinc-400">Analizando nodos...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 bg-zinc-50 overflow-x-auto flex gap-2 no-scrollbar">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-zinc-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-grow bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="relative group">
        {/* Tooltip / Callout */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-white px-4 py-3 rounded-xl shadow-xl border border-zinc-200 animate-fade-in-up origin-bottom-right">
            <div className="text-sm font-bold text-zinc-900 mb-1">
              {activeSection === 'compliance' ? 'Expertos en Normativa Crítica' :
                activeSection === 'portfolio' ? 'Portafolio Seleccionado' :
                  activeSection === 'services' ? 'Nuestros Servicios' :
                    activeSection === 'contact' ? 'Hablemos de tu Proyecto' :
                      activeSection === 'about' ? 'Perfil Corporativo' :
                        '¿Consultas, dudas?'}
            </div>
            <div className="text-xs text-zinc-600">
              {activeSection === 'compliance' ? 'Haz clic en una norma para obtener ayuda específica.' :
                activeSection === 'portfolio' ? 'Explora nuestros proyectos más destacados.' :
                  activeSection === 'services' ? 'Descubre cómo podemos potenciar tu inversión.' :
                    activeSection === 'contact' ? 'Contáctanos para una asesoría personalizada.' :
                      activeSection === 'about' ? 'Conoce nuestra experiencia y pilares estratégicos.' :
                        'Pregúntanos, tenemos la solución a tu proyecto.'}
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-zinc-200"></div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2 px-4 py-4 rounded-full shadow-xl transition-all duration-300 ${isOpen
            ? 'bg-zinc-800 text-zinc-400 rotate-90 scale-90'
            : 'bg-zinc-900 text-white hover:scale-105'
            }`}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <div className="relative">
                <Bot size={28} className="text-yellow-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full animate-pulse"></span>
              </div>
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-sm font-bold whitespace-nowrap pl-1">
                Asistente IA
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
