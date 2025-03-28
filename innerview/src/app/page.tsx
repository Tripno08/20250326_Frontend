"use client";

import Link from 'next/link';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-blue-800 mb-6">
          Innerview
        </h1>
        <h2 className="text-2xl text-blue-600 mb-8">
          Plataforma Educacional RTI/MTSS
        </h2>
        
        <p className="text-lg text-gray-700 mb-12">
          Uma plataforma educacional avançada focada em intervenções, monitoramento e 
          suporte ao framework RTI/MTSS. Nossa solução oferece visualizações de dados 
          superiores, integração perfeita com plataformas educacionais existentes e 
          suporte à tomada de decisão baseada em evidências.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" passHref>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              className="px-8 py-3"
            >
              Entrar
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              className="px-8 py-3"
            >
              Registrar
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Intervenções Baseadas em Evidências</h3>
            <p className="text-gray-600">
              Acesse uma biblioteca abrangente de intervenções comprovadas e personalize-as para suas necessidades.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Monitoramento de Progresso</h3>
            <p className="text-gray-600">
              Acompanhe o crescimento dos estudantes com visualizações claras e insights acionáveis.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Colaboração em Equipe</h3>
            <p className="text-gray-600">
              Facilite a comunicação e o trabalho conjunto entre professores, especialistas e administradores.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
