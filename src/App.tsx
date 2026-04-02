import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Shield, 
  Wifi, 
  Cpu, 
  Terminal, 
  Lock, 
  Globe, 
  Zap, 
  Radar,
  Crosshair,
  Signal,
  Eye,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STATUS_MESSAGES = [
  "INITIALISATION PROTOCOLE_GHOST...",
  "CONTOURNEMENT COUCHE_CHIFFREMENT_4...",
  "LIAISON ÉTABLIE: NOEUD_CELLULAIRE_7",
  "RECHERCHE D'ANOMALIES...",
  "NOYAU Z-CORE CHARGÉ",
  "SUIVI ACTIF: CIBLE_GHOST_01",
  "PUISSANCE DU SIGNAL: 98.4%",
  "DÉCRYPTAGE DU FLUX_PAQUETS...",
  "NIVEAU DE MENACE: MINIMAL",
  "LATENCE: 12ms"
];

const GhostDashboard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('monitor');
  const [threatLevel, setThreatLevel] = useState(12);
  const [isScanning, setIsScanning] = useState(true);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = STATUS_MESSAGES[Math.floor(Math.random() * STATUS_MESSAGES.length)];
      setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString('fr-FR')}] ${msg}`]);
      setThreatLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] font-mono text-[#00ff41] p-4 cyber-grid relative overflow-hidden">
      <div className="scanline" />
      
      {/* Header */}
      <header className="border-b border-[#00ff41]/20 pb-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00ff41]/10 border border-[#00ff41] flex items-center justify-center">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest uppercase">Z-CORE.GHOST</h1>
            <p className="text-[10px] opacity-50">TRACKERCELLMOBILE // v4.0.2-BETA</p>
          </div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-[10px] opacity-50 uppercase">État du Système</p>
            <p className="text-xs font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-ping" />
              OPÉRATIONNEL
            </p>
          </div>
          <div>
            <p className="text-[10px] opacity-50 uppercase">Niveau de Menace</p>
            <p className={`text-xs font-bold ${threatLevel > 70 ? 'text-red-500' : 'text-[#00ff41]'}`}>
              {threatLevel}% CRITIQUE
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)]">
        
        {/* Left Sidebar - Navigation */}
        <div className="col-span-12 lg:col-span-2 flex flex-col gap-2">
          {['MONITEUR', 'RÉSEAU', 'SÉCURITÉ', 'JOURNAUX'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`w-full text-left px-4 py-3 border transition-all duration-200 flex items-center justify-between group ${
                activeTab === tab.toLowerCase() 
                ? 'bg-[#00ff41]/10 border-[#00ff41] text-[#00ff41]' 
                : 'border-[#00ff41]/20 text-[#00ff41]/40 hover:border-[#00ff41]/50'
              }`}
            >
              <span className="text-xs font-bold tracking-tighter">{tab}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab.toLowerCase() ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
          
          <div className="mt-auto p-4 border border-[#00ff41]/10 bg-[#00ff41]/5">
            <p className="text-[10px] opacity-50 mb-2 uppercase">Charge Noyau</p>
            <div className="w-full h-1 bg-[#00ff41]/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#00ff41]" 
                animate={{ width: `${Math.random() * 100}%` }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </div>
        </div>

        {/* Center - Visualization */}
        <div className="col-span-12 lg:col-span-7 border border-[#00ff41]/20 bg-[#00ff41]/5 relative flex flex-col">
          <div className="absolute top-0 left-0 p-2 border-b border-r border-[#00ff41]/20 bg-[#0a0a0c] z-10">
            <p className="text-[10px] font-bold">FLUX_DIRECT_01</p>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {/* Radar Simulation */}
            <div className="relative w-64 h-64 lg:w-96 lg:h-96 border border-[#00ff41]/30 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 border border-[#00ff41]/10 rounded-full scale-75" />
              <div className="absolute inset-0 border border-[#00ff41]/10 rounded-full scale-50" />
              <div className="absolute inset-0 border border-[#00ff41]/10 rounded-full scale-25" />
              
              {/* Radar Sweep */}
              <motion.div 
                className="absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-transparent to-[#00ff41]/20 border-r border-[#00ff41]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ bottom: '50%', right: '50%' }}
              />

              {/* Targets */}
              <AnimatePresence>
                {isScanning && [1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 1.2 }}
                    className="absolute"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${30 + i * 15}%`
                    }}
                  >
                    <Crosshair className="w-4 h-4 text-red-500" />
                    <span className="absolute left-5 top-0 text-[8px] whitespace-nowrap">GHOST_{i}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Radar className="w-12 h-12 opacity-20" />
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 right-4 text-right">
              <p className="text-[10px] opacity-50">LAT: 34.0522 N</p>
              <p className="text-[10px] opacity-50">LNG: 118.2437 W</p>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="h-24 border-t border-[#00ff41]/20 grid grid-cols-4 divide-x divide-[#00ff41]/20">
            {[
              { label: 'Montant', value: '724 KB/s', icon: Wifi },
              { label: 'Descendant', value: '1.2 MB/s', icon: Zap },
              { label: 'Noeuds', value: '14 Actifs', icon: Globe },
              { label: 'CPU', value: '42%', icon: Cpu },
            ].map((stat, i) => (
              <div key={i} className="p-3 flex flex-col justify-center items-center text-center">
                <stat.icon className="w-4 h-4 mb-1 opacity-50" />
                <p className="text-[8px] opacity-50 uppercase">{stat.label}</p>
                <p className="text-xs font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Logs & Terminal */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          {/* Terminal */}
          <div className="flex-1 border border-[#00ff41]/20 bg-[#00ff41]/5 flex flex-col overflow-hidden">
            <div className="p-2 border-b border-[#00ff41]/20 bg-[#0a0a0c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                <span className="text-[10px] font-bold">CONSOLE_Z-CORE</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            <div className="flex-1 p-3 overflow-y-auto font-mono text-[10px] leading-relaxed scrollbar-hide">
              {logs.map((log, i) => (
                <div key={i} className="mb-1 opacity-80">
                  <span className="text-[#00ff41]/40 mr-2">{'>'}</span>
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Security Status */}
          <div className="h-48 border border-[#00ff41]/20 bg-[#00ff41]/5 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase">Matrice de Sécurité</span>
              <Lock className="w-3 h-3 opacity-50" />
            </div>
            <div className="space-y-3">
              {[
                { label: 'Pare-feu', status: 'Actif', color: 'bg-green-500' },
                { label: 'Chiffrement', status: 'AES-256', color: 'bg-green-500' },
                { label: 'Intrusion', status: 'Aucune', color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] opacity-70">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold">{item.status}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-auto w-full py-2 border border-red-500/50 text-red-500 text-[10px] font-bold hover:bg-red-500/10 transition-colors uppercase">
              Arrêt d'Urgence
            </button>
          </div>
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 w-full h-8 bg-[#00ff41]/10 border-t border-[#00ff41]/20 px-4 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            SYNCHRO: STABLE
          </span>
          <span className="flex items-center gap-1">
            <Signal className="w-3 h-3" />
            CELL: 4G_LTE_EXT
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTILISATEUR: OPÉRATEUR_GHOST</span>
          <span className="opacity-50">|</span>
          <span>{new Date().toLocaleDateString('fr-FR')}</span>
          <span>{new Date().toLocaleTimeString('fr-FR')}</span>
        </div>
      </footer>

      {/* Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none crt-flicker opacity-[0.03] bg-white mix-blend-overlay" />
    </div>
  );
};

export default function App() {
  return <GhostDashboard />;
}
