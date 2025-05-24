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

// Agrega estos estilos CSS para las notificaciones
const estilosNotificaciones = `
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
  border-left: 4px solid #3498db;
}

.notificacion-success {
  border-left: 4px solid #2ecc71;
}

.notificacion-warning {
  border-left: 4px solid #f39c12;
}

.notificacion-error {
  border-left: 4px solid #e74c3c;
}

.notificacion-icono {
  margin-right: 15px;
  font-size: 20px;
}

.notificacion-info .notificacion-icono {
  color: #3498db;
}

.notificacion-success .notificacion-icono {
  color: #2ecc71;
}

.notificacion-warning .notificacion-icono {
  color: #f39c12;
}

.notificacion-error .notificacion-icono {
  color: #e74c3c;
}

.notificacion-contenido {
  flex: 1;
}

.notificacion-titulo {
  font-weight: bold;
  margin-bottom: 5px;
}

.notificacion-mensaje {
  margin-bottom: 8px;
  font-size: 14px;
}

.notificacion-accion button {
  background: none;
  border: none;
  color: #3498db;
  padding: 0;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

.notificacion-cerrar {
  cursor: pointer;
  color: #95a5a6;
  transition: all 0.2s ease;
  padding: 5px;
}

.notificacion-cerrar:hover {
  color: #e74c3c;
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

/* Estilos para modo oscuro */
.dark-mode .notificacion {
  background-color: #2c2c2c;
  color: #f8f9fa;
}

.dark-mode .notificacion-cerrar {
  color: #d1d1d1;
}

.dark-mode .notificacion-cerrar:hover {
  color: #e74c3c;
}
`;