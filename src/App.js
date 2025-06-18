import React, { useState, useEffect } from 'react';
import { Play, Plus, Shuffle, Users, Home } from 'lucide-react';

// Ícone de copo de cerveja personalizado
const BeerGlass = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    {/* Copo principal */}
    <path d="M6 4h8c.5 0 1 .5 1 1v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5c0-.5.5-1 1-1z" 
          fill="currentColor" opacity="0.9"/>
    {/* Cerveja dentro do copo */}
    <path d="M6.5 7h7v11c0 .5-.4 1-1 1H7.5c-.6 0-1-.5-1-1V7z" 
          fill="currentColor" opacity="0.7"/>
    {/* Espuma */}
    <ellipse cx="10" cy="5.5" rx="3.5" ry="1.2" fill="currentColor" opacity="0.4"/>
    <ellipse cx="10" cy="4.8" rx="3" ry="0.8" fill="currentColor" opacity="0.6"/>
    {/* Alça do copo */}
    <path d="M15 7v6c0 1.1.9 2 2 2s2-.9 2-2V9c0-1.1-.9-2-2-2h-2z" 
          fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
    {/* Detalhes de brilho */}
    <rect x="7" y="8" width="1" height="8" rx="0.5" fill="currentColor" opacity="0.3"/>
  </svg>
);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const perguntasPadrao = [
"Si alguna vez has estado con alguien 10 años mayor que tú... ¡BEBE!",
"Si alguna vez has estado con alguien del mismo género... ¡BEBE!",
"Si alguna vez te has enamorado de un amigo o amiga... ¡BEBE!",
"Si alguna vez has besado a alguien en la primera cita... ¡BEBE!",
"Si alguna vez has mentido sobre tu edad para estar con alguien... ¡BEBE!",
"Si alguna vez has tenido un lío con alguien comprometido... ¡BEBE!",
"Si alguna vez has fingido un orgasmo... ¡BEBE!",
"Si alguna vez has tenido sexo en un lugar público... ¡BEBE!",
"Si alguna vez has enviado nudes a alguien... ¡BEBE!",
"Si alguna vez has tenido una aventura de una noche... ¡BEBE!",
"Si alguna vez has estado con dos amigos en el mismo día... ¡BEBE!",
"Si alguna vez tuviste un crush con un profesor o profesora... ¡BEBE!",
"Si alguna vez has tenido sexo en un coche... ¡BEBE!",
"Si alguna vez has tenido una relación a distancia... ¡BEBE!",
"Si alguna vez has engañado a alguien... ¡BEBE!",
"Si alguna vez te han engañado... ¡BEBE!",
"Si alguna vez has fingido estar enfermo/a para evitar tener sexo... ¡BEBE!",
"Si alguna vez has tenido sexo en casa de amigos... ¡BEBE!",
"Si alguna vez has tenido fantasías con celebridades... ¡BEBE!",
"Si alguna vez has usado una app de citas... ¡BEBE!",
"Si alguna vez has estado con alguien solo por su apariencia... ¡BEBE!",
"Si alguna vez has tenido una relación secreta... ¡BEBE!",
"Si alguna vez has tenido sexo borracho/a y no lo recuerdas... ¡BEBE!",
"Si alguna vez has sentido celos de un ex de tu pareja... ¡BEBE!",
"Si alguna vez has stalkeado a un ex en redes sociales... ¡BEBE!",
"Si alguna vez has vuelto con un ex más de una vez... ¡BEBE!",
"Si alguna vez has tenido sexo en el trabajo... ¡BEBE!",
"Si alguna vez has tenido fantasías con un amigo/a de tu pareja... ¡BEBE!",
"Si alguna vez has mentido sobre tu número de parejas... ¡BEBE!",
"Si alguna vez has estado con alguien por venganza... ¡BEBE!",
"Si alguna vez has tenido una relación con alguien con más de 15 años de diferencia... ¡BEBE!",
"Si alguna vez has tenido sexo en casa de tus padres... ¡BEBE!",
"Si alguna vez has tenido una cita por Tinder... ¡BEBE!",
"Si alguna vez has estado con un compañero de trabajo... ¡BEBE!",
"Si alguna vez has tenido un crush platónico... ¡BEBE!",
"Si alguna vez has tenido sexo en un hotel... ¡BEBE!",
"Si alguna vez has tenido una relación de tres meses o menos... ¡BEBE!",
"Si alguna vez has estado con alguien comprometido... ¡BEBE!",
"Si alguna vez has tenido una aventura en un viaje... ¡BEBE!",
"Si alguna vez has tenido sexo en una fiesta... ¡BEBE!",
"Si alguna vez has tenido una relación con alguien famoso... ¡BEBE!",
"Si alguna vez has estado con un primo/a segundo... ¡BEBE!",
"Si alguna vez has tenido sexo en una piscina o en el mar... ¡BEBE!",
"Si alguna vez has tenido un crush con tu jefe/a... ¡BEBE!",
"Si alguna vez has estado con un repartidor o conductor de Uber... ¡BEBE!",
"Si alguna vez has tenido una relación abierta... ¡BEBE!",
"Si alguna vez has tenido sexo en un motel... ¡BEBE!",
"Si alguna vez has tenido fantasías con un personaje de película o serie... ¡BEBE!",
"Si alguna vez has estado con alguien por dinero... ¡BEBE!",
"Si alguna vez has tenido un crush con un médico/a... ¡BEBE!",
"Si alguna vez has tenido sexo en el gimnasio... ¡BEBE!",
"Si alguna vez has estado con alguien solo para dar celos... ¡BEBE!",
"Si alguna vez has tenido una relación con un/a vecino/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un avión... ¡BEBE!",
"Si alguna vez has tenido un crush con tu entrenador personal... ¡BEBE!",
"Si alguna vez has estado con un bartender... ¡BEBE!",
"Si alguna vez has tenido una relación con un ex amigo/a... ¡BEBE!",
"Si alguna vez has tenido sexo en la playa... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu suegro/a... ¡BEBE!",
"Si alguna vez has estado con alguien casado... ¡BEBE!",
"Si alguna vez has tenido un crush con un masajista... ¡BEBE!",
"Si alguna vez has tenido sexo en un baño público... ¡BEBE!",
"Si alguna vez has tenido una relación con alguien de otra clase social... ¡BEBE!",
"Si alguna vez has estado con un camarero o camarera... ¡BEBE!",
"Si alguna vez has tenido un crush con tu dentista... ¡BEBE!",
"Si alguna vez has tenido sexo en una oficina... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu cuñado/a... ¡BEBE!",
"Si alguna vez has estado con alguien de la familia de tu ex... ¡BEBE!",
"Si alguna vez has tenido una relación con un músico... ¡BEBE!",
"Si alguna vez has tenido sexo en una biblioteca... ¡BEBE!",
"Si alguna vez has tenido un crush con un tatuador/a... ¡BEBE!",
"Si alguna vez has estado con un policía... ¡BEBE!",
"Si alguna vez has tenido una relación con un atleta... ¡BEBE!",
"Si alguna vez has tenido sexo en un ascensor... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu padrastro o madrastra... ¡BEBE!",
"Si alguna vez has estado con un bombero... ¡BEBE!",
"Si alguna vez has tenido un crush con tu peluquero/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un parque... ¡BEBE!",
"Si alguna vez has tenido una relación con un modelo... ¡BEBE!",
"Si alguna vez has estado con un piloto... ¡BEBE!",
"Si alguna vez has tenido un crush con un veterinario/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un cine... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu tío/a... ¡BEBE!",
"Si alguna vez has estado con un chef... ¡BEBE!",
"Si alguna vez has tenido una relación con un artista... ¡BEBE!",
"Si alguna vez has tenido sexo en una tienda... ¡BEBE!",
"Si alguna vez has tenido un crush con un farmacéutico/a... ¡BEBE!",
"Si alguna vez has estado con un arquitecto/a... ¡BEBE!",
"Si alguna vez has tenido una relación con un abogado/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un club... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu jefe o jefa... ¡BEBE!",
"Si alguna vez has estado con un médico/a... ¡BEBE!",
"Si alguna vez has tenido un crush con tu profesor/a del gimnasio... ¡BEBE!",
"Si alguna vez has tenido sexo en un consultorio... ¡BEBE!",
"Si alguna vez has tenido una relación con un ingeniero/a... ¡BEBE!",
"Si alguna vez has estado con un diseñador/a... ¡BEBE!",
"Si alguna vez has tenido un crush con un recepcionista... ¡BEBE!",
"Si alguna vez has tenido sexo en un salón de clases... ¡BEBE!",
"Si alguna vez has tenido fantasías con tu vecino/a... ¡BEBE!",
"Si alguna vez has estado con un periodista... ¡BEBE!",
"Si alguna vez has tenido una relación con un programador/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un estacionamiento... ¡BEBE!",
"Si alguna vez has tenido un crush con un guardia de seguridad... ¡BEBE!",
"Si alguna vez has estado con un psicólogo/a... ¡BEBE!",
"Si alguna vez has tenido una relación con un influencer... ¡BEBE!",
"Si alguna vez has tenido sexo en un restaurante... ¡BEBE!",
"Si alguna vez has tenido fantasías con un amigo/a de tus padres... ¡BEBE!",
"Si alguna vez has estado con un contador/a... ¡BEBE!",
"Si alguna vez has tenido un crush con un nutricionista... ¡BEBE!",
"Si alguna vez has tenido sexo en un centro comercial... ¡BEBE!",
"Si alguna vez has tenido una relación con un personal stylist... ¡BEBE!",
"Si alguna vez has dormido con alguien solo para tener dónde quedarte... ¡BEBE!",
"Si alguna vez has mentido sobre estar soltero/a... ¡BEBE!",
"Si alguna vez has tenido una relación por interés... ¡BEBE!",
"Si alguna vez has estado con alguien para conseguir un favor... ¡BEBE!",
"Si alguna vez has tenido sexo en horario laboral... ¡BEBE!",
"Si alguna vez has tenido una cita que fue una pesadilla... ¡BEBE!",
"Si alguna vez has fingido placer solo para terminar rápido... ¡BEBE!",
"Si alguna vez te has despertado sin recordar con quién estabas... ¡BEBE!",
"Si alguna vez has usado mentiras creativas en Tinder... ¡BEBE!",
"Si alguna vez has sentido miedo durante el sexo... ¡BEBE!",
"Si alguna vez has tenido sexo en una casa abandonada o lugar embrujado... ¡BEBE!",
"Si alguna vez has tenido que esconderte después de estar con alguien... ¡BEBE!",
"Si alguna vez has tenido una relación solo virtual... ¡BEBE!",
"Si alguna vez has enviado nudes a la persona equivocada... ¡BEBE!",
"Si alguna vez has tenido una obsesión amorosa... ¡BEBE!",
"Si alguna vez has tenido sexo el mismo día que conociste a alguien... ¡BEBE!",
"Si alguna vez has tenido que inventar una excusa para salir de una cita... ¡BEBE!",
"Si alguna vez has estado con alguien mucho más joven que tú... ¡BEBE!",
"Si alguna vez has tenido una relación por pena... ¡BEBE!",
"Si alguna vez has tenido sexo en transporte público... ¡BEBE!",
"Si alguna vez has tenido que pagar la cuenta solo/a... ¡BEBE!",
"Si alguna vez has fingido no conocer a alguien con quien estuviste... ¡BEBE!",
"Si alguna vez has tenido un crush con un personaje animado... ¡BEBE!",
"Si alguna vez has tenido sexo en un cementerio... ¡BEBE!",
"Si alguna vez has tenido una relación con alguien de tu escuela... ¡BEBE!",
"Si alguna vez te han pillado tus padres en una situación íntima... ¡BEBE!",
"Si alguna vez has tenido que salir por la ventana para escapar... ¡BEBE!",
"Si alguna vez has tenido sexo en casa de familiares... ¡BEBE!",
"Si alguna vez has tenido una relación con alguien que odiabas... ¡BEBE!",
"Si alguna vez has enviado un audio hot por WhatsApp... ¡BEBE!",
"Si alguna vez has tenido que bloquear a alguien por insistente... ¡BEBE!",
"Si alguna vez has tenido sexo en el lugar de trabajo de otra persona... ¡BEBE!",
"Si alguna vez has tenido un crush con un personaje de novela... ¡BEBE!",
"Si alguna vez has estado con alguien solo para no estar solo/a... ¡BEBE!",
"Si alguna vez has tenido que mentir sobre dónde estuviste toda la noche... ¡BEBE!",
"Si alguna vez has tenido sexo en una tienda de campaña... ¡BEBE!",
"Si alguna vez has tenido una relación que tus amigos odiaban... ¡BEBE!",
"Si alguna vez has estado con alguien por un desafío o apuesta... ¡BEBE!",
"Si alguna vez has fingido estar dormido/a... ¡BEBE!",
"Si alguna vez has tenido sexo en un lugar donde podrías ser arrestado/a... ¡BEBE!",
"Si alguna vez has tenido un crush con un actor de doblaje... ¡BEBE!",
"Si alguna vez has estado con dos personas en una misma fiesta o fin de semana... ¡BEBE!",
"Si alguna vez has tenido una relación que ocultaste a tu familia... ¡BEBE!",
"Si alguna vez has tenido sexo en horario de trabajo... ¡BEBE!",
"Si alguna vez has tenido que borrar fotos comprometedoras... ¡BEBE!",
"Si alguna vez has mentido sobre ser virgen... ¡BEBE!",
"Si alguna vez has tenido un crush con un streamer o YouTuber... ¡BEBE!",
"Si alguna vez has tenido sexo en un lugar religioso... ¡BEBE!",
"Si alguna vez has tenido una relación solo por atracción física... ¡BEBE!",
"Si alguna vez has estado con alguien solo para olvidar a otra persona... ¡BEBE!"
  ];

  useEffect(() => {
    setGameQuestions([...perguntasPadrao, ...customQuestions]);
  }, [customQuestions]);

  // Carregar perguntas personalizadas do localStorage
  useEffect(() => {
    const savedQuestions = localStorage.getItem('bebase-custom-questions');
    if (savedQuestions) {
      setCustomQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Salvar perguntas personalizadas no localStorage
  useEffect(() => {
    localStorage.setItem('bebase-custom-questions', JSON.stringify(customQuestions));
  }, [customQuestions]);

  const shuffleQuestions = () => {
    const shuffled = [...gameQuestions].sort(() => Math.random() - 0.5);
    setGameQuestions(shuffled);
    setCurrentQuestionIndex(0);
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * gameQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      const formattedQuestion = newQuestion.startsWith('Si alguna vez') ? 
        `${newQuestion}... BEBA!` : 
        `Se você já ${newQuestion}... BEBA!`;
      setCustomQuestions([...customQuestions, formattedQuestion]);
      setNewQuestion('');
    }
  };

  const startGame = () => {
    shuffleQuestions();
    setGameStarted(true);
    setCurrentScreen('game');
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="bg-white rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4 shadow-lg">
            <BeerGlass className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Bebe si</h1>
          <p className="text-green-100 text-lg">Para parejas y amigos valientes</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={startGame}
            className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:bg-green-50 transition-colors"
          >
            <Play className="w-6 h-6" />
            <span>Empezar Juego</span>
          </button>

          <button
            onClick={() => setCurrentScreen('custom')}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:bg-green-400 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span>Crear Preguntas</span>
          </button>

          <button
            onClick={() => setCurrentScreen('rules')}
            className="w-full bg-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg hover:bg-green-400 transition-colors"
          >
            <Users className="w-6 h-6" />
            <span>Cómo Jugar</span>
          </button>
        </div>

        <div className="mt-8 bg-white/20 rounded-2xl p-4 text-center">
          <p className="text-white text-sm">
            <strong>{perguntasPadrao.length + customQuestions.length}</strong> Preguntas disponibles
          </p>
          <p className="text-green-100 text-xs mt-1">
            {customQuestions.length} Preguntas personalizadas
          </p>
        </div>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6 pt-4">
          <button
            onClick={() => {
              setCurrentScreen('home');
              setGameStarted(false);
            }}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Home className="w-6 h-6" />
          </button>
          <div className="text-white text-center">
            <p className="text-sm opacity-80">Pergunta</p>
            <p className="text-xl font-bold">{currentQuestionIndex + 1} / {gameQuestions.length}</p>
          </div>
          <button
            onClick={shuffleQuestions}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
          >
            <Shuffle className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-800 text-xl text-center leading-relaxed font-medium">
            {gameQuestions[currentQuestionIndex]}
          </p>
        </div>

        <button
          onClick={getRandomQuestion}
          className="w-full bg-white text-green-600 py-4 px-6 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:bg-green-50 transition-colors"
        >
          <Shuffle className="w-6 h-6" />
          <span>Pregunta Aleatoria</span>
        </button>

        <div className="mt-4 bg-white/20 rounded-2xl p-3 text-center">
          <p className="text-white text-sm">
            Clique para uma nova pergunta surpresa!
          </p>
        </div>
      </div>
    </div>
  );

  const renderCustom = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors mr-4"
          >
            <Home className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Criar Perguntas</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Nova Pergunta</h3>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ex: ficou com alguém no trabalho"
            className="w-full border-2 border-green-200 rounded-xl p-4 text-gray-800 resize-none focus:border-green-500 focus:outline-none"
            rows="3"
          />
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Não precisa escrever "Se você já" no início
          </p>
          <button
            onClick={addCustomQuestion}
            disabled={!newQuestion.trim()}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-bold disabled:bg-gray-300 hover:bg-green-600 transition-colors"
          >
            Adicionar Pergunta
          </button>
        </div>

        {customQuestions.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Suas Perguntas ({customQuestions.length})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {customQuestions.map((question, index) => (
                <div key={index} className="bg-green-50 p-3 rounded-xl">
                  <p className="text-gray-800 text-sm">{question}</p>
                  <button
                    onClick={() => {
                      const newCustomQuestions = customQuestions.filter((_, i) => i !== index);
                      setCustomQuestions(newCustomQuestions);
                    }}
                    className="text-red-500 text-xs mt-2 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors mr-4"
          >
            <Home className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white">Como Jogar</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">📋 Reglas Básicas</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Cada jugador lee una pregunta en voz alta</p>
              <p>• Quien ya ha pasado por la situación debe beber</p>
              <p>• Sé honesto - ¡la diversión está en la sinceridad!</p>
              <p>• Respeta los límites de todos</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">🍷 Alternativas</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Sustituir bebida por: agua, jugo, refresco</p>
              <p>• Hacer actividad: flexiones, sentadillas, baile</p>
              <p>• Contar una historia relacionada</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">⚠️ Importante</h3>
            <div className="space-y-3 text-gray-700">
              <p>• Bebe con responsabilidad</p>
              <p>• No conduzcas después de consumir alcohol</p>
              <p>• Para si alguien se siente incómodo</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <p className="text-green-800 text-center font-medium">
              Diversão garantida com 150+ perguntas picantes! 🔥
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'game' && renderGame()}
      {currentScreen === 'custom' && renderCustom()}
      {currentScreen === 'rules' && renderRules()}
    </div>
  );
};

export default App;
