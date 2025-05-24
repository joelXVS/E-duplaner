//
// CSS
//

// Estilos CSS adicionales para las nuevas funcionalidades
const estilosAdicionales = `
/* Notificaciones */
.notificaciones-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notificacion {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  animation: slideInRight 0.3s ease;
  max-width: 100%;
}

.notificacion.cerrando {
  animation: slideOutRight 0.3s ease forwards;
}

.notificacion-info {
  border-left: 4px solid var(--info-color);
}

.notificacion-success {
  border-left: 4px solid var(--success-color);
}

.notificacion-warning {
  border-left: 4px solid var(--warning-color);
}

.notificacion-error {
  border-left: 4px solid var(--danger-color);
}

.notificacion-icono {
  margin-right: 15px;
  font-size: 20px;
}

.notificacion-info .notificacion-icono {
  color: var(--info-color);
}

.notificacion-success .notificacion-icono {
  color: var(--success-color);
}

.notificacion-warning .notificacion-icono {
  color: var(--warning-color);
}

.notificacion-error .notificacion-icono {
  color: var(--danger-color);
}

.notificacion-contenido {
  flex: 1;
}

.notificacion-mensaje {
  margin-bottom: 8px;
  font-size: 14px;
}

.notificacion-accion button {
  background: none;
  border: none;
  color: var(--primary-color);
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

.notificacion-cerrar {
  cursor: pointer;
  color: var(--gray-dark);
  transition: var(--transition);
  padding: 5px;
}

.notificacion-cerrar:hover {
  color: var(--danger-color);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Modo oscuro */
.dark-mode {
  --light-color: #1a1a1a;
  --dark-color: #f8f9fa;
  --text-color: #f8f9fa;
  --text-light: #1a1a1a;
  --gray-light: #2c2c2c;
  --gray-dark: #d1d1d1;
  
  background-color: #1a1a1a;
  color: #f8f9fa;
}

.dark-mode .sidebar {
  background: linear-gradient(135deg, #2c3e50, #1a1a2e);
}

.dark-mode .main-content {
  background-color: #1a1a1a;
}

.dark-mode .section-header {
  border-bottom-color: #2c2c2c;
}

.dark-mode .stat-card,
.dark-mode .summary-card,
.dark-mode .quick-actions,
.dark-mode .form-container,
.dark-mode .table-container,
.dark-mode .horarios-base-container,
.dark-mode .manual-generator-container,
.dark-mode .auto-generator-container,
.dark-mode .horarios-container,
.dark-mode .historial-container,
.dark-mode .tabs-container,
.dark-mode .modal-content {
  background-color: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dark-mode .data-table th {
  background-color: #3046c5;
}

.dark-mode .data-table td {
  border-bottom-color: #3c3c3c;
}

.dark-mode .data-table tr:hover {
  background-color: rgba(67, 97, 238, 0.1);
}

.dark-mode .form-group input,
.dark-mode .form-group select,
.dark-mode .form-group textarea {
  background-color: #3c3c3c;
  border-color: #4c4c4c;
  color: #f8f9fa;
}

.dark-mode .form-group input:focus,
.dark-mode .form-group select:focus,
.dark-mode .form-group textarea:focus {
  border-color: var(--primary-color);
}

.dark-mode .modal-header {
  background-color: #3046c5;
}

.dark-mode .modal-footer {
  background-color: #2c2c2c;
  border-top-color: #3c3c3c;
}

.dark-mode .horario-base-card {
  background-color: #2c2c2c;
}

.dark-mode .horario-table th {
  background-color: #3046c5;
}

.dark-mode .horario-table td {
  border-color: #3c3c3c;
}

.dark-mode .horario-table .time-cell {
  background-color: #3c3c3c;
}

.dark-mode .horario-table .break-cell {
  background-color: rgba(255, 159, 28, 0.1);
}

/* Backups */
.backups-container {
  max-height: 500px;
  overflow-y: auto;
}

.backups-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.backup-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--gray-light);
  border-radius: 8px;
}

.backup-info {
  flex: 1;
}

.backup-fecha {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
}

.backup-detalles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: var(--gray-dark);
}

/* Reportes */
.reportes-container {
  max-height: 500px;
  overflow-y: auto;
}

.reportes-opciones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.reporte-opcion {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--gray-light);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition);
}

.reporte-opcion:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.reporte-icono {
  font-size: 30px;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.reporte-titulo {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
}

.reporte-descripcion {
  text-align: center;
  font-size: 14px;
  color: var(--gray-dark);
}

.reporte-container {
  max-height: 500px;
  overflow-y: auto;
}

.reporte-acciones {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.reporte-tabla {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.reporte-tabla th,
.reporte-tabla td {
  padding: 10px;
  border: 1px solid var(--gray-light);
}

.reporte-tabla th {
  background-color: var(--primary-color);
  color: white;
}

.docente-detalle {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--gray-light);
}

.docente-info {
  margin-bottom: 15px;
}

.docente-asignaciones h5 {
  margin-top: 15px;
  margin-bottom: 10px;
  color: var(--primary-dark);
}

/* Estadísticas */
.estadisticas-container {
  max-height: 500px;
  overflow-y: auto;
}

.estadisticas-resumen {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.estadistica-item {
  text-align: center;
  padding: 15px;
  background-color: var(--gray-light);
  border-radius: 8px;
}

.estadistica-valor {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--primary-dark);
}

.estadistica-label {
  font-size: 14px;
  color: var(--gray-dark);
}

.estadistica-warning .estadistica-valor {
  color: var(--warning-color);
}

.estadistica-success .estadistica-valor {
  color: var(--success-color);
}

.estadisticas-detalle {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.estadisticas-seccion {
  background-color: var(--gray-light);
  border-radius: 8px;
  padding: 20px;
}

.estadisticas-seccion h3 {
  margin-bottom: 15px;
  color: var(--primary-dark);
}

.estadisticas-tabla table {
  width: 100%;
  border-collapse: collapse;
}

.estadisticas-tabla th,
.estadisticas-tabla td {
  padding: 8px;
  border: 1px solid var(--gray-dark);
  text-align: center;
}

.estadisticas-tabla th {
  background-color: var(--primary-color);
  color: white;
}

/* Conflictos */
.conflictos-lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.conflicto-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background-color: var(--gray-light);
  border-radius: 8px;
}

.conflicto-numero {
  width: 30px;
  height: 30px;
  background-color: var(--danger-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
}

.conflicto-detalle {
  flex: 1;
}

.conflicto-tipo {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--danger-color);
}

.conflicto-mensaje {
  font-size: 14px;
}
`;

// Función para agregar los estilos de notificaciones mejorados
function agregarEstilosNotificaciones() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Contenedor de notificaciones */
    .notificaciones-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      pointer-events: none;
    }
    
    /* Notificación base */
    .notificacion {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      pointer-events: auto;
      position: relative;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .notificacion-visible {
      transform: translateX(0);
      opacity: 1;
    }
    
    .notificacion-saliendo {
      transform: translateX(100%) scale(0.8);
      opacity: 0;
      transition: all 0.3s ease-in;
    }
    
    /* Barra de progreso */
    .notificacion-barra-progreso {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .notificacion-progreso {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
      background-size: 400% 400%;
      animation: progressBar linear, gradientShift 2s ease infinite;
      transform-origin: left;
    }
    
    @keyframes progressBar {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    /* Contenido wrapper */
    .notificacion-contenido-wrapper {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      gap: 15px;
    }
    
    /* Icono animado */
    .notificacion-icono {
      font-size: 24px;
      animation: iconBounce 0.6s ease;
      flex-shrink: 0;
    }
    
    @keyframes iconBounce {
      0%, 20%, 60%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      80% { transform: translateY(-5px); }
    }
    
    /* Contenido */
    .notificacion-contenido {
      flex: 1;
      min-width: 0;
    }
    
    .notificacion-titulo {
      font-weight: 700;
      font-size: 16px;
      color: #2c3e50;
      margin-bottom: 5px;
      background: linear-gradient(45deg, #3498db, #9b59b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .notificacion-mensaje {
      font-size: 14px;
      color: #34495e;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    
    /* Botón de acción */
    .notificacion-accion {
      margin-top: 10px;
    }
    
    .notificacion-btn {
      background: linear-gradient(45deg, #3498db, #2980b9);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .notificacion-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    }
    
    /* Botón cerrar */
    .notificacion-cerrar {
      cursor: pointer;
      color: #95a5a6;
      transition: all 0.3s ease;
      padding: 5px;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .notificacion-cerrar:hover {
      color: #e74c3c;
      background-color: rgba(231, 76, 60, 0.1);
      transform: scale(1.1);
    }
    
    /* Tipos específicos */
    .notificacion-success {
      border-left: 5px solid #27ae60;
      background: linear-gradient(135deg, #d5f4e6 0%, #ffffff 100%);
    }
    
    .notificacion-warning {
      border-left: 5px solid #f39c12;
      background: linear-gradient(135deg, #fef9e7 0%, #ffffff 100%);
    }
    
    .notificacion-error {
      border-left: 5px solid #e74c3c;
      background: linear-gradient(135deg, #fadbd8 0%, #ffffff 100%);
    }
    
    .notificacion-info {
      border-left: 5px solid #3498db;
      background: linear-gradient(135deg, #d6eaf8 0%, #ffffff 100%);
    }
    
    /* Efectos hover */
    .notificacion:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
    
    .notificacion:hover .notificacion-progreso {
      animation-play-state: paused;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .notificaciones-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }
      
      .notificacion {
        margin: 0 10px;
      }
      
      .notificacion-contenido-wrapper {
        padding: 15px;
      }
      
      .notificacion-titulo {
        font-size: 14px;
      }
      
      .notificacion-mensaje {
        font-size: 13px;
      }
    }
    
    /* Animaciones adicionales */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .notificacion-error .notificacion-icono {
      animation: shake 0.5s ease-in-out;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .notificacion-success .notificacion-icono {
      animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes swing {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      75% { transform: rotate(-5deg); }
    }
    
    .notificacion-warning .notificacion-icono {
      animation: swing 0.8s ease-in-out;
    }
  `;
  document.head.appendChild(styleElement);
}