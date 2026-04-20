import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardUC } from './pages/dashboard/DashboardUC';
import { DashboardUP } from './pages/dashboard/DashboardUP';
import { DashboardUE } from './pages/dashboard/DashboardUE';
import { DashboardUA } from './pages/dashboard/DashboardUA';
import { RegistrarDescarte } from './pages/RegistrarDescarte';
import { HistoricoDescartes } from './pages/HistoricoDescartes';
import { ImpactoAmbiental } from './pages/ImpactoAmbiental';
import { CentralEducativa } from './pages/CentralEducativa';
import { ConteudoEducativo } from './pages/ConteudoEducativo';
import { PontosColeta } from './pages/PontosColeta';
import { PedidosColeta } from './pages/PedidosColeta';
import { NovoPedidoColeta } from './pages/NovoPedidoColeta';
import { Notificacoes } from './pages/Notificacoes';
import { Perfil } from './pages/Perfil';
import { AdminGestaoUsuarios } from './pages/admin/AdminGestaoUsuarios';
import { AdminGestaoPermissoes } from './pages/admin/AdminGestaoPermissoes';
import { AdminGestaoConteudos } from './pages/admin/AdminGestaoConteudos';
import { GestaoWorkspace } from './pages/empresarial/GestaoWorkspace';
import { DetalhesMembro } from './pages/empresarial/DetalhesMembro';
import { ArquiteturaSystem } from './pages/ArquiteturaSystem';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'cadastro', element: <SignupPage /> },
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Navigate to="/app/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardUC /> },
          { path: 'dashboard-premium', element: <DashboardUP /> },
          { path: 'dashboard-empresarial', element: <DashboardUE /> },
          { path: 'dashboard-admin', element: <DashboardUA /> },
          { path: 'registrar-descarte', element: <RegistrarDescarte /> },
          { path: 'historico', element: <HistoricoDescartes /> },
          { path: 'impacto', element: <ImpactoAmbiental /> },
          { path: 'educacao', element: <CentralEducativa /> },
          { path: 'educacao/:materialId', element: <ConteudoEducativo /> },
          { path: 'pontos-coleta', element: <PontosColeta /> },
          { path: 'pedidos-coleta', element: <PedidosColeta /> },
          { path: 'pedidos-coleta/novo', element: <NovoPedidoColeta /> },
          { path: 'notificacoes', element: <Notificacoes /> },
          { path: 'perfil', element: <Perfil /> },
          { path: 'admin/usuarios', element: <AdminGestaoUsuarios /> },
          { path: 'admin/permissoes', element: <AdminGestaoPermissoes /> },
          { path: 'admin/conteudos', element: <AdminGestaoConteudos /> },
          { path: 'empresarial/workspace', element: <GestaoWorkspace /> },
          { path: 'empresarial/membro/:membroId', element: <DetalhesMembro /> },
          { path: 'arquitetura', element: <ArquiteturaSystem /> },
        ]
      },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);
