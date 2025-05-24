// =========================================
// VARIABLES GENERALES
// =========================================

let datos = {
  grados: [],
  areas: [],
  docentes: [],
  asignaturas: [],
  grupos: [],
  asignaciones: [],
  horariosBase: [],
  horarios: [],
  historial: [],
}

let isSidebarExpanded = true;
let isSidebarCollapsed = false;

// =========================================
// UTILIDADES
// =========================================

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function convertirHoraAMinutos(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos
}

function convertirMinutosAHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return `${horas.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
}

function mostrarAyuda(seccion) {
  const modalTitulo = document.getElementById("modal-ayuda-titulo");
  const modalContenido = document.getElementById("modal-ayuda-contenido");
  
  switch (seccion) {
    case "dashboard":
      modalTitulo.textContent = "Ayuda - Panel de Control";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Panel de Control</h3>
          <p>El panel de control muestra un resumen de la información de su institución educativa y le permite acceder rápidamente a las funciones principales.</p>
          
          <h3>Secciones</h3>
          <ul>
            <li>Estadísticas: Muestra el número total de docentes, asignaturas, grupos y horarios generados.</li>
            <li>Progreso de Asignaciones: Indica el porcentaje de asignaciones académicas completadas.</li>
            <li>Horarios Recientes: Muestra los últimos horarios generados.</li>
            <li>Acciones Rápidas: Acceso directo a las funciones más utilizadas.</li>
          </ul>
        </div>
      `;
      break;
    case "docentes":
      modalTitulo.textContent = "Ayuda - Gestión de Docentes";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Gestión de Docentes</h3>
          <p>Esta sección le permite administrar la información de los docentes de su institución.</p>
          
          <h3>Funciones</h3>
          <ul>
            <li>Registrar Nuevo Docente: Permite agregar un nuevo docente con su información personal, restricciones de horario, asignaturas y grupos asignados.</li>
            <li>Ver Horario: Muestra el horario actual del docente.</li>
            <li>Editar: Permite modificar la información del docente.</li>
            <li>Eliminar: Elimina al docente del sistema.</li>
          </ul>
          
          <h3>Restricciones de Horario</h3>
          <p>Puede agregar restricciones de horario para indicar los días y horas en que un docente no está disponible para dar clases.</p>
          
          <h3>Asignación de Asignaturas y Grupos</h3>
          <p>Puede asignar las asignaturas que imparte el docente y los grupos a los que enseña cada asignatura.</p>
        </div>
      `;
      break;
    case "asignaturas":
      modalTitulo.textContent = "Ayuda - Gestión de Asignaturas";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Gestión de Asignaturas</h3>
          <p>Esta sección le permite administrar las asignaturas que se imparten en su institución.</p>
          
          <h3>Funciones</h3>
          <ul>
            <li>Registrar Nueva Asignatura: Permite agregar una nueva asignatura con su identificador, nombre, área y grados aplicables.</li>
            <li>Editar: Permite modificar la información de la asignatura.</li>
            <li>Eliminar: Elimina la asignatura del sistema.</li>
          </ul>
          
          <h3>Grados Aplicables y Horas Semanales</h3>
          <p>Para cada asignatura, debe indicar los grados en los que se imparte y la cantidad de horas semanales para cada grado.</p>
        </div>
      `;
      break;
    case "grupos":
      modalTitulo.textContent = "Ayuda - Gestión de Grupos";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Gestión de Grupos</h3>
          <p>Esta sección le permite administrar los grupos de estudiantes de su institución.</p>
          
          <h3>Funciones</h3>
          <ul>
            <li>Registrar Nuevo Grupo: Permite agregar un nuevo grupo con su grado y nombre/identificador.</li>
            <li>Ver Grupo: Muestra la información detallada del grupo, incluyendo sus asignaciones académicas.</li>
            <li>Editar: Permite modificar la información del grupo.</li>
            <li>Eliminar: Elimina el grupo del sistema.</li>
          </ul>
          
          <h3>Director de Grupo</h3>
          <p>El director de grupo se asigna desde la sección de Gestión de Docentes.</p>
        </div>
      `;
      break;
    case "asignaciones":
      modalTitulo.textContent = "Ayuda - Asignaciones Académicas";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Asignaciones Académicas</h3>
          <p>Esta sección muestra las asignaciones académicas creadas automáticamente al registrar docentes y asignarles asignaturas y grupos.</p>
          
          <h3>Información Mostrada</h3>
          <ul>
            <li>Grupo: El grupo al que se asigna la asignatura.</li>
            <li>Asignatura: La asignatura que se imparte.</li>
            <li>Docente: El docente que imparte la asignatura.</li>
            <li>Horas Semanales: La cantidad de horas semanales asignadas.</li>
            <li>Bloque Máximo: El número máximo de horas consecutivas que se pueden asignar en un día.</li>
          </ul>
          
          <h3>Filtros</h3>
          <p>Puede filtrar las asignaciones por grupo, docente o utilizando el buscador.</p>
        </div>
      `;
      break;
    case "horarios-base":
      modalTitulo.textContent = "Ayuda - Horarios Base";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Horarios Base</h3>
          <p>Esta sección le permite crear y administrar los horarios base que servirán como plantilla para la generación de horarios.</p>
          
          <h3>Funciones</h3>
          <ul>
            <li>Crear Nuevo Horario Base: Permite definir un nuevo horario base con sus parámetros.</li>
            <li>Editar: Permite modificar los parámetros del horario base.</li>
            <li>Eliminar: Elimina el horario base del sistema.</li>
            <li>Generación Manual: Inicia el proceso de generación manual de horarios.</li>
            <li>Generación Automática: Inicia el proceso de generación automática de horarios.</li>
          </ul>
          
          <h3>Parámetros del Horario Base</h3>
          <ul>
            <li>Nombre: Identificador del horario base.</li>
            <li>Hora de Inicio y Fin: Define el rango horario de la jornada escolar.</li>
            <li>Duración de Bloque: Duración en minutos de cada bloque de clase.</li>
            <li>Días de la Semana: Días en los que se imparten clases.</li>
            <li>Recesos: Periodos de descanso durante la jornada escolar.</li>
            <li>Grupos: Grupos a los que se aplicará este horario base.</li>
          </ul>
        </div>
      `;
      break;
    case "generacion-manual":
      modalTitulo.textContent = "Ayuda - Generación Manual de Horarios";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Generación Manual de Horarios</h3>
          <p>Esta sección le permite crear horarios de forma manual, asignando las clases según su criterio.</p>
          
          <h3>Proceso</h3>
          <ul>
            <li>Seleccionar Horario Base: Elija el horario base que servirá como plantilla.</li>
            <li>Seleccionar Grupo: Elija el grupo para el que desea generar el horario.</li>
            <li>Asignar Clases: Arrastre las asignaciones desde el panel izquierdo a las celdas del horario.</li>
            <li>Guardar Horarios: Guarde los horarios generados para todos los grupos.</li>
          </ul>
          
          <h3>Consideraciones</h3>
          <ul>
            <li>No se pueden asignar clases en los periodos de receso.</li>
            <li>No se pueden asignar clases a un docente que ya tiene clase en ese horario.</li>
            <li>No se pueden asignar clases a un docente que tiene restricción en ese horario.</li>
            <li>Puede eliminar una asignación haciendo clic en el botón X de la celda.</li>
          </ul>
        </div>
      `;
      break;
    case "generacion-automatica":
      modalTitulo.textContent = "Ayuda - Generación Automática de Horarios";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Generación Automática de Horarios</h3>
          <p>Esta sección le permite generar horarios de forma automática, utilizando algoritmos que optimizan la distribución de clases.</p>
          
          <h3>Proceso</h3>
          <ul>
            <li>Seleccionar Horario Base: Elija el horario base que servirá como plantilla.</li>
            <li>Configurar Generación: Configure las opciones de generación automática.</li>
            <li>Generar Horarios: El sistema generará automáticamente los horarios.</li>
            <li>Revisar Resultados: Revise los resultados y conflictos encontrados.</li>
            <li>Guardar Horarios: Guarde los horarios generados.</li>
          </ul>
          
          <h3>Consideraciones</h3>
          <ul>
            <li>El sistema intenta optimizar la distribución de clases, minimizando conflictos y respetando las restricciones.</li>
            <li>Puede revisar los conflictos y asignaciones pendientes antes de guardar.</li>
            <li>Si hay problemas, puede reintentar la generación o guardar de todos modos.</li>
          </ul>
        </div>
      `;
      break;
    case "historial":
      modalTitulo.textContent = "Ayuda - Historial de Generaciones";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Historial de Generaciones</h3>
          <p>Esta sección muestra un registro de todos los horarios generados, tanto manual como automáticamente.</p>
          
          <h3>Funciones</h3>
          <ul>
            <li>Ver Horarios: Muestra los horarios generados para todos los grupos o docentes.</li>
            <li>Exportar: Permite exportar los horarios en diferentes formatos.</li>
            <li>Eliminar: Elimina la generación del historial.</li>
          </ul>
          
          <h3>Información Mostrada</h3>
          <ul>
            <li>Nombre: Identificador de la generación.</li>
            <li>Fecha: Fecha en que se generó el horario.</li>
            <li>Tipo: Manual o automática.</li>
            <li>Grupos/Clases: Cantidad de grupos y clases incluidos en la generación.</li>
          </ul>
        </div>
      `;
      break;
    case "ver-horarios":
      modalTitulo.textContent = "Ayuda - Ver Horarios";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Ver Horarios</h3>
          <p>Esta sección le permite visualizar los horarios generados y exportarlos en diferentes formatos.</p>
          
          <h3>Opciones de Vista</h3>
          <ul>
            <li>Por Grupos: Muestra los horarios organizados por grupos.</li>
            <li>Por Docentes: Muestra los horarios organizados por docentes.</li>
          </ul>
          
          <h3>Opciones de Exportación</h3>
          <p>Puede exportar los horarios en diferentes formatos para su impresión o distribución.</p>
        </div>
      `;
      break;
    case "escuela":
      modalTitulo.textContent = "Ayuda - Escuela";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>Escuela</h3>
          <p>Esta sección le permite administrar la información básica de su institución educativa.</p>
          
          <h3>Grados</h3>
          <ul>
            <li>Registrar Nuevo Grado: Permite agregar un nuevo grado académico.</li>
            <li>Editar: Permite modificar el nombre del grado.</li>
            <li>Eliminar: Elimina el grado del sistema (solo si no tiene grupos asociados).</li>
          </ul>
          
          <h3>Áreas</h3>
          <ul>
            <li>Registrar Nueva Área: Permite agregar una nueva área académica con su nombre y color.</li>
            <li>Editar: Permite modificar el nombre y color del área.</li>
            <li>Eliminar: Elimina el área del sistema (solo si no tiene asignaturas asociadas).</li>
          </ul>
        </div>
      `;
      break;
    default:
      modalTitulo.textContent = "Ayuda";
      modalContenido.innerHTML = `
        <div class="modal-ayuda-contenido">
          <h3>E-duplaner</h3>
          <p>E-duplaner es una aplicación para la generación y gestión de horarios escolares.</p>
          
          <h3>Secciones Principales</h3>
          <ul>
            <li>Panel de Control: Muestra un resumen de la información de su institución.</li>
            <li>Gestión de Docentes: Administra la información de los docentes.</li>
            <li>Gestión de Asignaturas: Administra las asignaturas que se imparten.</li>
            <li>Gestión de Grupos: Administra los grupos de estudiantes.</li>
            <li>Asignaciones Académicas: Muestra las asignaciones de docentes a asignaturas y grupos.</li>
            <li>Horarios Base: Crea y administra las plantillas para la generación de horarios.</li>
            <li>Generación Manual: Crea horarios de forma manual.</li>
            <li>Generación Automática: Crea horarios de forma automática.</li>
            <li>Historial: Muestra un registro de los horarios generados.</li>
            <li>Escuela: Administra la información básica de la institución.</li>
          </ul>
        </div>
      `;
  }
  
  // Mostrar modal
  document.getElementById("modal-ayuda").style.display = "block";
}

function elementoExiste(id) {
  const elemento = document.getElementById(id);
  if (!elemento) {
    console.error(`Elemento con ID ${id} no encontrado`);
    return false;
  }
  return true;
}

function cerrarModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

function agregarEstilosAdicionales() {
  const styleElement = document.createElement('style');
  styleElement.textContent = estilosAdicionales;
  document.head.appendChild(styleElement)
}

function corregirIdsIncorrectos() {
  // Verificar IDs de elementos críticos
  const elementosCriticos = [
    { id: "docente-form", alternativo: "form-docente" },
    { id: "asignatura-form", alternativo: "form-asignatura" },
    { id: "grupo-form", alternativo: "form-grupo" },
    { id: "grado-form", alternativo: "form-grado" },
    { id: "area-form", alternativo: "form-area" },
    { id: "horario-base-form", alternativo: "form-horario-base" },
    { id: "tipo-vista", alternativo: "vista-tipo" },
    { id: "filtro-area-asignatura", alternativo: "filtro-area" },
    { id: "filtro-grado-grupo", alternativo: "filtro-grado" }
  ];
  
  elementosCriticos.forEach(elemento => {
    const principal = document.getElementById(elemento.id);
    const alternativo = document.getElementById(elemento.alternativo);
    
    if (!principal && alternativo) {
      console.log(`Corrigiendo ID: ${elemento.alternativo} -> ${elemento.id}`);
      alternativo.id = elemento.id;
    }
  });
  
  // Verificar si faltan elementos críticos
  elementosCriticos.forEach(elemento => {
    if (!document.getElementById(elemento.id)) {
      console.warn(`Elemento crítico ${elemento.id} no encontrado.`);
    }
  });
}

function verificarElementosCriticos() {
  const elementosCriticos = [
    "form-nuevo-docente", "form-nueva-asignatura", "form-nuevo-grupo", 
    "form-nuevo-grado", "form-nueva-area", "form-nuevo-horario-base",
    "tabla-docentes", "tabla-asignaturas", "tabla-grupos", 
    "tabla-asignaciones", "horarios-base-grid"
  ];
  
  elementosCriticos.forEach(id => {
    if (!document.getElementById(id)) {
      console.warn(`Elemento crítico ${id} no encontrado`);
    }
  });
}

function validarFormularioVacio(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const inputs = form.querySelectorAll('input[required], select[required]');
  let esValido = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      esValido = false;
      input.style.borderColor = '#e74c3c';
    } else {
      input.style.borderColor = '';
    }
  });
  
  return esValido;
}

// =========================================
// INICIALIZACION Y NAVEGACION
// =========================================

// Función para inicializar la navegación por la pagína
function inicializarNavegacion() {
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSection(targetId);
    });
  });
  
  // Verificar si el modo oscuro está activado
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    
    document.querySelectorAll('#modo-oscuro-btn').forEach(btn => {
      btn.innerHTML = '<i class="fas fa-sun"></i>';
      btn.title = 'Cambiar a modo claro';
    });
  }
  
  // En dispositivos móviles, mantener la barra lateral colapsada
  if (window.innerWidth <= 992) {
    document.querySelector('.sidebar').classList.add('collapsed');
    isSidebarCollapsed = true;
    isSidebarExpanded = false;
    document.querySelector('.main-content').classList.add('expanded');
  }
  
  // Actualizar visibilidad del toggle
  actualizarVisibilidadNavToggle();
  
  // Agregar listener para resize
  window.addEventListener('resize', actualizarVisibilidadNavToggle);
}

// Función para controlar la barra de navegación
function toggleSideBar() {
  const sidebar = document.querySelector('.sidebar');
  const span = document.querySelector('#tb-nav span');
  const icon = document.querySelector('#tb-nav i');
  const mainContent = document.querySelector(".main-content");

  isSidebarExpanded = !isSidebarExpanded;

  if (sidebar) sidebar.classList.toggle("collapsed");
  if (mainContent) mainContent.classList.toggle("expanded");

  if (span) span.textContent = isSidebarExpanded ? "Ocultar NavBar" : "Mostrar NavBar";
  if (icon) {
    icon.className = isSidebarExpanded ? "fa fa-eye-slash" : "fa fa-eye";
  }
}

function actualizarVisibilidadNavToggle() {
  const tbNavContainer = document.getElementById('tb-nav-container');
  if (tbNavContainer) {
    // Mostrar solo si la ventana es grande Y la sidebar está expandida
    if (window.innerWidth > 992 && isSidebarExpanded) {
      tbNavContainer.style.display = "block";
    } else {
      tbNavContainer.style.display = "none";
    }
  }
}

// Función para mostrar las secciones durante la navegación
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Actualizar navegación
  const navLinks = document.querySelectorAll(".sidebar-nav li");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`.sidebar-nav a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.parentElement.classList.add("active");
  }

  // Limpiar formularios abiertos al cambiar de sección
  limpiarFormulariosAbiertos();

  // Acciones específicas para cada sección
  switch (sectionId) {
    case "docentes":
      cargarFormularioDocente();
      break
    case "asignaturas":
      cargarFormularioAsignatura();
      break
    case "grupos":
      cargarFormularioGrupo();
      break
    case "asignaciones":
      cargarTablaAsignaciones();
      verificarAsignacionesCompletas();
      break
    case "horarios-base":
      cargarHorariosBase();
      break
    case "generacion-manual":
      cargarSelectorHorarioBaseManual();
      verificarAsignacionesCompletas("generacion-manual-alert");
      break
    case "generacion-automatica":
      cargarSelectorHorarioBaseAuto();
      verificarAsignacionesCompletas("generacion-auto-alert");
      break
    case "historial":
      cargarHistorial();
      break
  }
}

// Función para limpiar todos formularios cuando se abran
function limpiarFormulariosAbiertos() {
  const formContainers = document.querySelectorAll(".form-container");
  formContainers.forEach(container => {
    if (container.style.display === "block") {
      // Obtener el ID del formulario
      const formId = container.id;
      
      // Ocultar el formulario
      container.style.display = "none";
      
      // Resetear el formulario si existe
      const form = container.querySelector("form");
      if (form) {
        form.reset();
      }
      
      // Limpiar contenedores específicos según el formulario
      if (formId === "docente-form") {
        document.getElementById("asignaturas-container").innerHTML = "";
        document.getElementById("restricciones-container").innerHTML = `
          <div class="restriccion-item">
            <select class="restriccion-dia">
              <option value="">Seleccionar día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
            </select>
            <input type="time" class="restriccion-hora-inicio" placeholder="Hora inicio">
            <input type="time" class="restriccion-hora-fin" placeholder="Hora fin">
            <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
          </div>
        `;
      } else if (formId === "horario-base-form") {
        document.getElementById("recesos-container").innerHTML = "";
      }
    }
  });
}

// Función para mostrar los formularios
function inicializarEventosFormularios() {
  // Eliminar eventos anteriores para evitar duplicados
  const toggleButtons = document.querySelectorAll("[onclick*='toggleForm']");
  toggleButtons.forEach((button) => {
    const originalOnClick = button.getAttribute("onclick");
    button.removeAttribute("onclick");
    
    button.addEventListener("click", function() {
      const formId = originalOnClick.match(/'([^']+)'/)[1];
      toggleForm(formId);
    });
  });
  
  // Inicializar filtros
  inicializarFiltros();
}

// Función para cerrar los formularios
function toggleForm(formId) {
  const form = document.getElementById(formId);
  if (!form) {
    console.error(`Formulario con ID ${formId} no encontrado`);
    return;
  }
  
  // Ocultar todos los formularios primero
  const allForms = document.querySelectorAll(".form-container");
  allForms.forEach(f => {
    if (f.id !== formId) {
      f.style.display = "none";
      
      // Resetear el formulario si existe
      const formElement = f.querySelector("form");
      if (formElement) {
        formElement.reset();
      }
    }
  });
  
  // Mostrar u ocultar el formulario seleccionado
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
    
    // Cargar datos necesarios según el formulario
    if (formId === "docente-form") {
      cargarFormularioDocente();
    } else if (formId === "asignatura-form") {
      cargarFormularioAsignatura();
    } else if (formId === "grupo-form") {
      cargarFormularioGrupo();
    } else if (formId === "horario-base-form") {
      cargarFormularioHorarioBase();
    } else if (formId === "grado-form") {
      // No necesita carga especial
    } else if (formId === "area-form") {
      // No necesita carga especial
    }
  } else {
    form.style.display = "none";
    
    // Resetear el formulario si existe
    const formElement = form.querySelector("form");
    if (formElement) {
      formElement.reset();
    }
    
    // Limpiar contenedores específicos según el formulario
    if (formId === "docente-form") {
      document.getElementById("asignaturas-container").innerHTML = "";
      document.getElementById("restricciones-container").innerHTML = `
        <div class="restriccion-item">
          <select class="restriccion-dia">
            <option value="">Seleccionar día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
          </select>
          <input type="time" class="restriccion-hora-inicio" placeholder="Hora inicio">
          <input type="time" class="restriccion-hora-fin" placeholder="Hora fin">
          <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
        </div>
      `;
    } else if (formId === "horario-base-form") {
      document.getElementById("recesos-container").innerHTML = "";
    }
  }
}

// =========================================
// CARGA Y ENLACE DE DATOS GLOBALES
// =========================================

// Función para cargar los datos guardados
function cargarDatos() {
  // Cargar datos desde localStorage
  const datosGuardados = localStorage.getItem("eduplanerData");
  if (datosGuardados) {
    datos = JSON.parse(datosGuardados);
  }

  // Cargar tablas
  cargarTablaDocentes();
  cargarTablaAsignaturas();
  cargarTablaGrupos();
  cargarTablaAsignaciones();
  cargarTablaGrados();
  cargarTablaAreas();
}

// Función para guardar los datos después de cada acción
function guardarDatos() {
  localStorage.setItem("eduplanerData", JSON.stringify(datos));
  actualizarEstadisticas();
  verificarAsignacionesCompletas();
}

// Función para cargar datos por defecto si no hay datos (PRUEBA)
function cargarDatosPredefinidos() {
  fetch("datos-predefinidos.json")
    .then((response) => response.json())
    .then((datosPredefinidos) => {
      
      // Actualizar datos con los predefinidos
      datos = datosPredefinidos;
      if (datos.asignaciones.length === 0) {
        generarAsignacionesDesdeDocentes();
      }

      // Guardar datos
      guardarDatos();

      // Recargar tablas
      cargarTablaDocentes();
      cargarTablaAsignaturas();
      cargarTablaGrupos();
      cargarTablaAsignaciones();
      cargarTablaGrados();
      cargarTablaAreas();
    })
    .catch((error) => {
      console.error("Error al cargar datos predefinidos:", error);
    });
}

// Función para generar las asignaciones si no se cargan desde importar datos
function generarAsignacionesDesdeDocentes() {
  // Limpiar asignaciones existentes
  datos.asignaciones = [];
  
  datos.docentes.forEach(docente => {
    if (!docente.asignaturasGrupos) return;
    
    docente.asignaturasGrupos.forEach(ag => {
      const asignatura = datos.asignaturas.find(a => a.id === ag.asignatura);
      if (!asignatura) return;

      ag.grupos.forEach(grupoId => {
        const grupo = datos.grupos.find(g => g.id === grupoId);
        if (!grupo) return;

        const gradoHoras = asignatura.gradosHoras?.find(gh => gh.grado === grupo.grado);
        if (!gradoHoras) return;

        // Verificar si ya existe esta asignación
        const existeAsignacion = datos.asignaciones.some(a => 
          a.grupo === grupoId && 
          a.asignatura === asignatura.id && 
          a.docente === docente.id
        );

        if (!existeAsignacion) {
          datos.asignaciones.push({
            id: generateId(),
            grupo: grupoId,
            asignatura: asignatura.id,
            docente: docente.id,
            horasSemanales: gradoHoras.horas,
            bloqueMaximo: Math.ceil(gradoHoras.horas / 2)
          });
        }
      });
    });
  });
}

// =========================================
// ASIGNACIONES ACADEMICAS
// =========================================

// Reemplaza la función verificarAsignacionesCompletas
function verificarAsignacionesCompletas(alertId = null) {
  // Verificar si hay grupos sin asignaciones completas
  const gruposIncompletos = [];
  
  datos.grupos.forEach(grupo => {
    // Calcular el total de bloques necesarios para este grupo
    const horarioBase = datos.horariosBase.find(h => h.grupos.includes(grupo.id));
    if (!horarioBase) return;
    
    // Calcular bloques disponibles (excluyendo recesos)
    const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
      .filter(b => !b.esReceso);
    
    const totalBloques = bloques.length * horarioBase.dias.length;
    
    // Obtener asignaciones para este grupo
    const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupo.id);
    const totalHorasAsignadas = asignacionesGrupo.reduce((total, a) => total + a.horasSemanales, 0);
    
    // Si las horas asignadas no cubren todos los bloques, el grupo está incompleto
    if (totalHorasAsignadas < totalBloques) {
      const grado = datos.grados.find(g => g.id === grupo.grado);
      gruposIncompletos.push({
        id: grupo.id,
        nombre: `${grado?.nombre || ""} ${grupo.nombre}`,
        bloquesFaltantes: totalBloques - totalHorasAsignadas
      });
    }
  });
  
  // Mostrar alerta en el dashboard si hay grupos incompletos
  const dashboardAlert = document.getElementById("missing-assignments-alert");
  if (dashboardAlert) {
    if (gruposIncompletos.length > 0) {
      dashboardAlert.style.display = "flex";
    } else {
      dashboardAlert.style.display = "none";
    }
  }
  
  // Mostrar alerta en la sección de asignaciones
  const asignacionesAlert = document.getElementById("asignaciones-incompletas-alert");
  if (asignacionesAlert) {
    if (gruposIncompletos.length > 0) {
      asignacionesAlert.style.display = "block";
      
      // Mostrar lista de grupos incompletos
      const gruposListaElement = document.getElementById("grupos-incompletos-lista");
      if (gruposListaElement) {
        gruposListaElement.innerHTML = `
          <ul class="grupos-incompletos">
            ${gruposIncompletos.map(g => `
              <li>${g.nombre} - Faltan ${g.bloquesFaltantes} bloques</li>
            `).join("")}
          </ul>
        `;
      }
    } else {
      asignacionesAlert.style.display = "none";
    }
  }
  
  // Mostrar alerta específica si se proporciona un ID
  if (alertId && gruposIncompletos.length > 0) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
      alertElement.style.display = "block";
    }
  } else if (alertId) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
      alertElement.style.display = "none";
    }
  }

  return gruposIncompletos;
}

// Filtro para asignaciones (Grupos - Docentes)
function filtrarAsignaciones() {
  const filtroGrupo = document.getElementById("filtro-grupo-asignacion").value;
  const filtroDocente = document.getElementById("filtro-docente-asignacion").value;
  const busqueda = document.getElementById("buscar-asignacion").value.toLowerCase();
  
  const tabla = document.getElementById("tabla-asignaciones");
  const tbody = tabla.querySelector("tbody");
  
  if (datos.asignaciones.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No hay asignaciones registradas</td></tr>';
    return
  }
  
  tbody.innerHTML = "";
  
  let asignacionesFiltradas = datos.asignaciones;
  
  // Filtrar por grupo
  if (filtroGrupo) {
    asignacionesFiltradas = asignacionesFiltradas.filter(a => a.grupo === filtroGrupo);
  }
  
  // Filtrar por docente
  if (filtroDocente) {
    asignacionesFiltradas = asignacionesFiltradas.filter(a => a.docente === filtroDocente);
  }
  
  // Filtrar por búsqueda
  if (busqueda) {
    asignacionesFiltradas = asignacionesFiltradas.filter(a => {
      const grupo = datos.grupos.find(g => g.id === a.grupo);
      const grado = grupo ? datos.grados.find(g => g.id === grupo.grado) : null;
      const asignatura = datos.asignaturas.find(as => as.id === a.asignatura);
      const docente = datos.docentes.find(d => d.id === a.docente);
      
      const grupoText = `${grado?.nombre || ""} ${grupo?.nombre || ""}`.toLowerCase();
      const asignaturaText = asignatura?.nombre.toLowerCase() || "";
      const docenteText = docente?.nombre.toLowerCase() || "";
      
      return grupoText.includes(busqueda) || asignaturaText.includes(busqueda) || docenteText.includes(busqueda)
    });
  }
  
  if (asignacionesFiltradas.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No se encontraron asignaciones con los filtros aplicados</td></tr>';
    return
  }
  
  asignacionesFiltradas.forEach(asignacion => {
    const tr = document.createElement("tr");
    
    // Obtener grupo
    const grupo = datos.grupos.find(g => g.id === asignacion.grupo);
    const grado = grupo ? datos.grados.find(g => g.id === grupo.grado) : null;
    
    // Obtener asignatura
    const asignatura = datos.asignaturas.find(a => a.id === asignacion.asignatura);
    
    // Obtener docente
    const docente = datos.docentes.find(d => d.id === asignacion.docente);
    
    tr.innerHTML = `
      <td>${grado?.nombre || ""} ${grupo?.nombre || "Sin grupo"}</td>
      <td>${asignatura?.nombre || "Sin asignatura"}</td>
      <td>${docente?.nombre || "Sin docente"}</td>
      <td>${asignacion.horasSemanales}</td>
      <td>${asignacion.bloqueMaximo}</td>
    `
    
    tbody.appendChild(tr);
  });
}

// =========================================
// CARGA DE FORMULARIOS PARA INSTANCIAS
// =========================================

function cargarFormularioDocente() {
  // Cargar asignaturas para el selector
  const asignaturasContainer = document.getElementById("asignaturas-container");
  asignaturasContainer.innerHTML = "";

  // Cargar grupos para el selector de director de grupo
  const directorGrupoSelect = document.getElementById("docente-director-grupo");
  directorGrupoSelect.innerHTML = '<option value="">No asignar como director</option>';

  const gruposSinDirector = datos.grupos.filter(grupo => {
    return !datos.docentes.some(docente => docente.directorGrupo === grupo.id)
  });

  gruposSinDirector.forEach(grupo => {
    const gradoNombre = datos.grados.find(g => g.id === grupo.grado)?.nombre || "";
    directorGrupoSelect.innerHTML += `
      <option value="${grupo.id}">${gradoNombre} ${grupo.nombre}</option>
    `
  });
}

function cargarFormularioAsignatura() {
  // Cargar áreas para el selector
  const areaSelect = document.getElementById("asignatura-area");
  areaSelect.innerHTML = '<option value="">Seleccionar área</option>';
  
  datos.areas.forEach(area => {
    areaSelect.innerHTML += `<option value="${area.id}">${area.nombre}</option>`
  });
  
  // Cargar grados para las horas semanales
  const gradosHorasContainer = document.getElementById("grados-horas-items");
  gradosHorasContainer.innerHTML = "";
  
  datos.grados.forEach(grado => {
    const gradoHorasItem = document.createElement("div");
    gradoHorasItem.className = "grado-horas-item";
    gradoHorasItem.innerHTML = `
      <div>
        <input type="checkbox" id="grado-${grado.id}" class="grado-checkbox" value="${grado.id}">
        <label for="grado-${grado.id}">${grado.nombre}</label>
      </div>
      <div>
        <input type="number" id="horas-${grado.id}" class="horas-input" min="1" max="10" value="1" disabled>
      </div>
    `
    
    gradosHorasContainer.appendChild(gradoHorasItem);
    
    // Agregar evento para habilitar/deshabilitar input de horas
    const checkbox = gradoHorasItem.querySelector(`#grado-${grado.id}`);
    const horasInput = gradoHorasItem.querySelector(`#horas-${grado.id}`);
    
    checkbox.addEventListener("change", function() {
      horasInput.disabled = !this.checked;
    });
  });
}

function cargarFormularioGrupo() {
  // Cargar grados para el selector
  const gradoSelect = document.getElementById("grupo-grado");
  gradoSelect.innerHTML = '<option value="">Seleccionar grado</option>';
  
  datos.grados.forEach(grado => {
    gradoSelect.innerHTML += `<option value="${grado.id}">${grado.nombre}</option>`
  });
}

// Grados y Areas no necesario, se hace desde el HTML

function cargarFormularioHorarioBase() {
  // Cargar días de la semana
  const diasContainer = document.getElementById("dias-semana-container");
  diasContainer.innerHTML = "";
  
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
  diasSemana.forEach(dia => {
    const checkboxItem = document.createElement("div");
    checkboxItem.className = "checkbox-item";
    checkboxItem.innerHTML = `
      <input type="checkbox" id="dia-${dia}" class="dia-checkbox" value="${dia}">
      <label for="dia-${dia}">${dia}</label>
    `;
    
    diasContainer.appendChild(checkboxItem);
  });
  
  // Marcar por defecto de lunes a viernes
  document.querySelectorAll(".dia-checkbox").forEach(checkbox => {
    if (checkbox.value !== "Sábado") {
      checkbox.checked = true;
    }
  });
  
  // Cargar grupos
  const gruposContainer = document.getElementById("grupos-container");
  gruposContainer.innerHTML = "";
  
  // Agrupar grupos por grado
  const gruposPorGrado = {}
  
  datos.grupos.forEach(grupo => {
    const grado = datos.grados.find(g => g.id === grupo.grado);
    if (!grado) return
    
    if (!gruposPorGrado[grado.id]) {
      gruposPorGrado[grado.id] = {
        grado: grado,
        grupos: []
      }
    }
    
    gruposPorGrado[grado.id].grupos.push(grupo);
  });
  
  // Crear checkboxes por grado
  Object.values(gruposPorGrado).forEach(item => {
    const gradoDiv = document.createElement("div");
    gradoDiv.className = "grado-grupos";
    gradoDiv.innerHTML = `<h4>${item.grado.nombre}</h4>`
    
    const checkboxGroup = document.createElement("div");
    checkboxGroup.className = "checkbox-group";
    
    item.grupos.forEach(grupo => {
      const checkboxItem = document.createElement("div");
      checkboxItem.className = "checkbox-item";
      checkboxItem.innerHTML = `
        <input type="checkbox" id="grupo-${grupo.id}" class="grupo-checkbox" value="${grupo.id}">
        <label for="grupo-${grupo.id}">${grupo.nombre}</label>
      `
      checkboxGroup.appendChild(checkboxItem);
    });
    
    gradoDiv.appendChild(checkboxGroup);
    gruposContainer.appendChild(gradoDiv);
  });
}

// =========================================
// CREACIÓN DE INSTANCIAS
// =========================================

// Reemplaza la función agregarDocente
function agregarDocente(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nuevo-docente')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const nombre = document.getElementById("docente-nombre").value.trim();
  if (!nombre) {
    notificarAdvertencia("Por favor ingrese el nombre del docente");
    return false;
  }
  
  // Verificar si ya existe un docente con el mismo nombre
  if (datos.docentes.some(d => d.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe un docente con ese nombre");
    return false;
  }
  
  const maxHoras = parseInt(document.getElementById("docente-max-horas").value) || 20;
  const directorGrupo = document.getElementById("docente-director-grupo").value;
  
  // Obtener restricciones
  const restricciones = [];
  const restriccionesItems = document.querySelectorAll("#restricciones-container .restriccion-item");
  
  restriccionesItems.forEach(item => {
    const dia = item.querySelector(".restriccion-dia").value;
    const horaInicio = item.querySelector(".restriccion-hora-inicio").value;
    const horaFin = item.querySelector(".restriccion-hora-fin").value;
    
    if (dia && horaInicio && horaFin) {
      restricciones.push({
        dia,
        horaInicio,
        horaFin
      });
    }
  });
  
  // Obtener asignaturas y grupos
  const asignaturasGrupos = [];
  const asignaturaItems = document.querySelectorAll("#asignaturas-container .asignatura-grupo-item");
  
  asignaturaItems.forEach(item => {
    const asignaturaSelect = item.querySelector(".asignatura-select");
    if (!asignaturaSelect || !asignaturaSelect.value) return;
    
    const asignaturaId = asignaturaSelect.value;
    const gruposCheckboxes = item.querySelectorAll(".grupo-checkbox:checked");
    
    const grupos = Array.from(gruposCheckboxes).map(checkbox => checkbox.value);
    
    if (grupos.length > 0) {
      asignaturasGrupos.push({
        asignatura: asignaturaId,
        grupos
      });
    }
  });
  
  // Crear nuevo docente
  const nuevoDocente = {
    id: generateId(),
    nombre,
    restricciones,
    maxHoras,
    asignaturasGrupos,
    directorGrupo: directorGrupo || null
  };
  
  // Verificar restricciones de horas antes de agregar
  let totalHorasAsignadas = 0;
  
  for (const ag of asignaturasGrupos) {
    const asignatura = datos.asignaturas.find(a => a.id === ag.asignatura);
    if (!asignatura) continue;
    
    for (const grupoId of ag.grupos) {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) continue;
      
      const gradoHoras = asignatura.gradosHoras.find(gh => gh.grado === grupo.grado);
      if (!gradoHoras) continue;
      
      totalHorasAsignadas += gradoHoras.horas;
    }
  }
  
  // Verificar que no exceda las horas máximas del docente
  if (totalHorasAsignadas > maxHoras) {
    notificarAdvertencia(`El docente tendría asignadas ${totalHorasAsignadas} horas, pero su máximo es ${maxHoras}.`);
    return false;
  }
  
  // Agregar a la lista de docentes
  datos.docentes.push(nuevoDocente);
  
  // Crear asignaciones académicas
  asignaturasGrupos.forEach(ag => {
    const asignatura = datos.asignaturas.find(a => a.id === ag.asignatura);
    
    ag.grupos.forEach(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return;
      
      // Encontrar las horas semanales para este grado
      const gradoHoras = asignatura.gradosHoras.find(gh => gh.grado === grupo.grado);
      if (!gradoHoras) return;
      
      // Crear asignación
      const nuevaAsignacion = {
        id: generateId(),
        grupo: grupoId,
        asignatura: ag.asignatura,
        docente: nuevoDocente.id,
        horasSemanales: gradoHoras.horas,
        bloqueMaximo: Math.ceil(gradoHoras.horas / 2)
      };
      
      datos.asignaciones.push(nuevaAsignacion);
    });
  });
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tablas
  cargarTablaDocentes();
  cargarTablaAsignaciones();
  
  // Ocultar formulario
  toggleForm("docente-form");
  
  // Limpiar formulario
  document.getElementById("form-nuevo-docente").reset();
  document.getElementById("asignaturas-container").innerHTML = "";
  document.getElementById("restricciones-container").innerHTML = `
    <div class="restriccion-item">
      <select class="restriccion-dia">
        <option value="">Seleccionar día</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sábado">Sábado</option>
      </select>
      <input type="time" class="restriccion-hora-inicio" placeholder="Hora inicio">
      <input type="time" class="restriccion-hora-fin" placeholder="Hora fin">
      <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
    </div>
  `;

  notificarExito("Docente agregado correctamente");  
  return false;
}

// Reemplaza la función agregarAsignatura
function agregarAsignatura(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nueva-asignatura')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const identificador = document.getElementById("asignatura-identificador").value.trim();
  const nombre = document.getElementById("asignatura-nombre").value.trim();
  const area = document.getElementById("asignatura-area").value;
  
  if (!identificador || !nombre || !area) {
    notificarAdvertencia("Por favor complete todos los campos obligatorios");
    return false;
  }
  
  // Verificar si el identificador ya existe
  if (datos.asignaturas.some(a => a.identificador.toLowerCase() === identificador.toLowerCase())) {
    notificarAdvertencia("Ya existe una asignatura con ese identificador");
    return false;
  }
  
  // Verificar si el nombre ya existe
  if (datos.asignaturas.some(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe una asignatura con ese nombre");
    return false;
  }
  
  // Obtener grados y horas
  const gradosHoras = [];
  const gradosCheckboxes = document.querySelectorAll(".grado-checkbox:checked");
  
  gradosCheckboxes.forEach(checkbox => {
    const gradoId = checkbox.value;
    const horas = parseInt(document.getElementById(`horas-${gradoId}`).value);
    
    if (horas > 0) {
      gradosHoras.push({
        grado: gradoId,
        horas
      });
    }
  });
  
  // Verificar que se haya seleccionado al menos un grado
  if (gradosHoras.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un grado con horas válidas");
    return false;
  }
  
  // Crear nueva asignatura
  const nuevaAsignatura = {
    id: generateId(),
    identificador,
    nombre,
    area,
    gradosHoras
  };
  
  // Agregar a la lista de asignaturas
  datos.asignaturas.push(nuevaAsignatura);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAsignaturas();
  
  // Ocultar formulario
  toggleForm("asignatura-form");
  
  // Limpiar formulario
  document.getElementById("form-nueva-asignatura").reset();
  
  // Desmarcar todos los checkboxes y deshabilitar inputs de horas
  document.querySelectorAll(".grado-checkbox").forEach(checkbox => {
    checkbox.checked = false;
  });
  
  document.querySelectorAll(".horas-input").forEach(input => {
    input.disabled = true;
    input.value = 1;
  });
  
  // Mostrar notificación
  notificarExito("Asignatura agregada correctamente");
  
  return false;
}

// Reemplaza la función agregarGrupo
function agregarGrupo(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nuevo-grupo')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const grado = document.getElementById("grupo-grado").value;
  const nombre = document.getElementById("grupo-nombre").value.trim();
  
  if (!grado || !nombre) {
    notificarAdvertencia("Por favor complete todos los campos");
    return false;
  }
  
  // Verificar si ya existe un grupo con el mismo nombre en el mismo grado
  if (datos.grupos.some(g => g.grado === grado && g.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe un grupo con ese nombre en el grado seleccionado");
    return false;
  }
  
  // Crear nuevo grupo
  const nuevoGrupo = {
    id: generateId(),
    grado,
    nombre
  };
  
  // Agregar a la lista de grupos
  datos.grupos.push(nuevoGrupo);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrupos();
  
  // Ocultar formulario
  toggleForm("grupo-form");
  
  // Limpiar formulario
  document.getElementById("form-nuevo-grupo").reset();
  
  // Mostrar notificación
  notificarExito("Grupo agregado correctamente");
  
  return false;
}

// Reemplaza la función agregarGrado
function agregarGrado(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nuevo-grado')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const nombre = document.getElementById("grado-nombre").value.trim();
  
  if (!nombre) {
    notificarAdvertencia("Por favor ingrese el nombre del grado");
    return false;
  }
  
  // Verificar si ya existe un grado con el mismo nombre
  if (datos.grados.some(g => g.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe un grado con ese nombre");
    return false;
  }
  
  // Crear nuevo grado
  const nuevoGrado = {
    id: generateId(),
    nombre
  };
  
  // Agregar a la lista de grados
  datos.grados.push(nuevoGrado);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrados();
  
  // Ocultar formulario
  toggleForm("grado-form");
  
  // Limpiar formulario
  document.getElementById("form-nuevo-grado").reset();
  
  // Mostrar notificación
  notificarExito("Grado agregado correctamente");
  
  return false;
}

// Reemplaza la función agregarArea
function agregarArea(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nueva-area')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const nombre = document.getElementById("area-nombre").value.trim();
  const color = document.getElementById("area-color").value;
  
  if (!nombre || !color) {
    notificarAdvertencia("Por favor complete todos los campos");
    return false;
  }
  
  // Verificar si ya existe un área con el mismo nombre
  if (datos.areas.some(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe un área con ese nombre");
    return false;
  }
  
  // Crear nueva área
  const nuevaArea = {
    id: generateId(),
    nombre,
    color
  };
  
  // Agregar a la lista de áreas
  datos.areas.push(nuevaArea);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAreas();
  
  // Ocultar formulario
  toggleForm("area-form");
  
  // Limpiar formulario
  document.getElementById("form-nueva-area").reset();
  
  // Mostrar notificación
  notificarExito("Área agregada correctamente");
  
  return false;
}

// Reemplaza la función agregarHorarioBase
function agregarHorarioBase(event) {
  event.preventDefault();
  
  // Validar formulario
  if (!validarFormularioVacio('form-nuevo-horario-base')) {
    notificarAdvertencia('Por favor complete todos los campos requeridos');
    return false;
  }
  
  // Obtener datos del formulario
  const nombre = document.getElementById("horario-base-nombre").value.trim();
  const horaInicio = document.getElementById("horario-base-hora-inicio").value;
  const horaFin = document.getElementById("horario-base-hora-fin").value;
  const duracionBloque = parseInt(document.getElementById("horario-base-duracion-bloque").value);
  
  if (!nombre || !horaInicio || !horaFin || !duracionBloque) {
    notificarAdvertencia("Por favor complete todos los campos obligatorios");
    return false;
  }
  
  // Verificar que la hora de fin sea mayor que la de inicio
  if (horaInicio >= horaFin) {
    notificarAdvertencia("La hora de fin debe ser mayor que la hora de inicio");
    return false;
  }
  
  // Verificar si ya existe un horario base con el mismo nombre
  if (datos.horariosBase.some(h => h.nombre.toLowerCase() === nombre.toLowerCase())) {
    notificarAdvertencia("Ya existe un horario base con ese nombre");
    return false;
  }
  
  // Obtener días seleccionados
  const dias = [];
  document.querySelectorAll(".dia-checkbox:checked").forEach(checkbox => {
    dias.push(checkbox.value);
  });
  
  // Verificar que se haya seleccionado al menos un día
  if (dias.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un día de la semana");
    return false;
  }
  
  // Obtener recesos
  const recesos = [];
  document.querySelectorAll("#recesos-container .receso-item").forEach(item => {
    const horaInicio = item.querySelector(".receso-hora-inicio").value;
    const horaFin = item.querySelector(".receso-hora-fin").value;
    const nombre = item.querySelector(".receso-nombre").value;
    
    if (horaInicio && horaFin) {
      if (horaInicio >= horaFin) {
        notificarAdvertencia("Las horas de receso no son válidas");
        return false;
      }
      
      recesos.push({
        horaInicio,
        horaFin,
        nombre: nombre || "Receso"
      });
    }
  });
  
  // Obtener grupos seleccionados
  const grupos = [];
  document.querySelectorAll(".grupo-checkbox:checked").forEach(checkbox => {
    grupos.push(checkbox.value);
  });
  
  // Verificar que se haya seleccionado al menos un grupo
  if (grupos.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un grupo");
    return false;
  }
  
  // Crear nuevo horario base
  const nuevoHorarioBase = {
    id: generateId(),
    nombre,
    horaInicio,
    horaFin,
    duracionBloque,
    dias,
    recesos,
    grupos,
    fechaCreacion: new Date().toISOString()
  };
  
  // Agregar a la lista de horarios base
  datos.horariosBase.push(nuevoHorarioBase);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar lista de horarios base
  cargarHorariosBase();
  
  // Ocultar formulario
  toggleForm("horario-base-form");
  
  // Limpiar formulario
  document.getElementById("form-nuevo-horario-base").reset();
  document.getElementById("recesos-container").innerHTML = "";
  
  // Marcar por defecto de lunes a viernes
  document.querySelectorAll(".dia-checkbox").forEach(checkbox => {
    if (checkbox.value !== "Sábado") {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  
  // Desmarcar todos los grupos
  document.querySelectorAll(".grupo-checkbox").forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Mostrar notificación
  notificarExito("Horario base agregado correctamente");
  
  return false;
}
// =========================================
// PANELES DE EDICIONES DE INSTANCIAS
// =========================================

function editarDocente(docenteId) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return;
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Docente: ${docente.nombre}`;
  
  modalContenido.innerHTML = `
    <form id="form-editar-docente">
      <input type="hidden" id="editar-docente-id" value="${docente.id}">
      <div class="form-group">
        <label for="editar-docente-nombre">Nombre Completo:</label>
        <input type="text" id="editar-docente-nombre" value="${docente.nombre}" required>
      </div>
      
      <div class="form-group">
        <label>Restricciones de Horario:</label>
        <div class="restricciones-container" id="editar-restricciones-container">
          ${docente.restricciones.length > 0 ? 
            docente.restricciones.map(r => `
              <div class="restriccion-item">
                <select class="restriccion-dia">
                  <option value="">Seleccionar día</option>
                  <option value="Lunes" ${r.dia === "Lunes" ? "selected" : ""}>Lunes</option>
                  <option value="Martes" ${r.dia === "Martes" ? "selected" : ""}>Martes</option>
                  <option value="Miércoles" ${r.dia === "Miércoles" ? "selected" : ""}>Miércoles</option>
                  <option value="Jueves" ${r.dia === "Jueves" ? "selected" : ""}>Jueves</option>
                  <option value="Viernes" ${r.dia === "Viernes" ? "selected" : ""}>Viernes</option>
                  <option value="Sábado" ${r.dia === "Sábado" ? "selected" : ""}>Sábado</option>
                </select>
                <input type="time" class="restriccion-hora-inicio" value="${r.horaInicio}" placeholder="Hora inicio">
                <input type="time" class="restriccion-hora-fin" value="${r.horaFin}" placeholder="Hora fin">
                <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
              </div>
            `).join("") : 
            `<div class="restriccion-item">
              <select class="restriccion-dia">
                <option value="">Seleccionar día</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
              </select>
              <input type="time" class="restriccion-hora-inicio" placeholder="Hora inicio">
              <input type="time" class="restriccion-hora-fin" placeholder="Hora fin">
              <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
            </div>`
          }
        </div>
        <button type="button" class="btn btn-secondary" onclick="agregarRestriccion('editar-restricciones-container')"><i class="fas fa-plus"></i> Agregar Restricción</button>
      </div>
      
      <div class="form-group">
        <label for="editar-docente-max-horas">Máximo de Horas Semanales:</label>
        <input type="number" id="editar-docente-max-horas" min="1" max="40" value="${docente.maxHoras}">
      </div>
      
      <div class="form-group">
        <label for="editar-docente-director-grupo">Asignar como Director de Grupo:</label>
        <select id="editar-docente-director-grupo">
          <option value="">No asignar como director</option>
          ${datos.grupos.map(grupo => {
            const gradoNombre = datos.grados.find(g => g.id === grupo.grado)?.nombre || "";
            const isDirector = docente.directorGrupo === grupo.id;
            const hasDirector = datos.docentes.some(d => d.id !== docente.id && d.directorGrupo === grupo.id);
            
            if (isDirector || !hasDirector) {
              return `<option value="${grupo.id}" ${isDirector ? "selected" : ""}>${gradoNombre} ${grupo.nombre}</option>`;
            }
            return "";
          }).join("")}
        </select>
      </div>
      
      <div class="form-group">
        <label>Asignaturas y Grupos:</label>
        <div id="editar-asignaturas-container">
          ${docente.asignaturasGrupos && docente.asignaturasGrupos.length > 0 ? 
            docente.asignaturasGrupos.map((ag, index) => {
              const asignatura = datos.asignaturas.find(a => a.id === ag.asignatura);
              
              // Generar HTML para los grupos ya seleccionados
              const gruposHTML = datos.grados.map(grado => {
                const gruposGrado = datos.grupos.filter(g => 
                  g.grado === grado.id && 
                  asignatura && 
                  asignatura.gradosHoras.some(gh => gh.grado === grado.id)
                );
                
                if (gruposGrado.length === 0) return "";
                
                return `
                  <div class="grado-grupos">
                    <h4>${grado.nombre}</h4>
                    <div class="checkbox-group">
                      ${gruposGrado.map(grupo => `
                        <div class="checkbox-item">
                          <input type="checkbox" id="editar-grupo-${index}-${grupo.id}" class="grupo-checkbox" value="${grupo.id}" data-asignatura="${ag.asignatura}" ${ag.grupos.includes(grupo.id) ? "checked" : ""}>
                          <label for="editar-grupo-${index}-${grupo.id}">${grupo.nombre}</label>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                `;
              }).join("");
              
              return `
                <div class="asignatura-grupo-item">
                  <label>Asignatura:</label>
                  <select class="asignatura-select" onchange="cargarGruposParaAsignaturaEditar(this, ${index})">
                    <option value="">Seleccionar asignatura</option>
                    ${datos.asignaturas.map(asig => `
                      <option value="${asig.id}" ${asig.id === ag.asignatura ? "selected" : ""}>${asig.nombre}</option>
                    `).join("")}
                  </select>
                  
                  <div class="grados-grupos">
                    <h4>Grupos:</h4>
                    <div class="grupos-container" id="editar-grupos-container-${index}">
                      ${gruposHTML || '<p class="empty-state">Seleccione una asignatura primero</p>'}
                    </div>
                  </div>
                  
                  <button type="button" class="btn-icon" onclick="eliminarAsignaturaDocenteEditar(this)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              `;
            }).join("") : 
            '<p class="empty-state">No hay asignaturas asignadas</p>'
          }
        </div>
        <button type="button" class="btn btn-secondary" onclick="agregarAsignaturaDocenteEditar()"><i class="fas fa-plus"></i> Agregar Asignatura</button>
      </div>
    </form>
  `;
  
  modalGuardar.onclick = () => guardarEdicionDocenteCompleta();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block";
}

function editarAsignatura(asignaturaId) {
  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  if (!asignatura) return
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Asignatura: ${asignatura.nombre}`
  
  modalContenido.innerHTML = `
    <form id="form-editar-asignatura">
      <input type="hidden" id="editar-asignatura-id" value="${asignatura.id}">
      <div class="form-group">
        <label for="editar-asignatura-identificador">Identificador:</label>
        <input type="text" id="editar-asignatura-identificador" value="${asignatura.identificador}" required maxlength="6">
        <small>Debe contener hasta 6 caracteres</small>
      </div>
      <div class="form-group">
        <label for="editar-asignatura-nombre">Nombre:</label>
        <input type="text" id="editar-asignatura-nombre" value="${asignatura.nombre}" required>
      </div>
      <div class="form-group">
        <label for="editar-asignatura-area">Área:</label>
        <select id="editar-asignatura-area" required>
          <option value="">Seleccionar área</option>
          ${datos.areas.map(area => `
            <option value="${area.id}" ${area.id === asignatura.area ? "selected" : ""}>${area.nombre}</option>
          `).join("")}
        </select>
      </div>
      <div class="form-group">
        <label>Grados Aplicables y Horas Semanales:</label>
        <div class="grados-horas-container">
          <div class="grados-horas-header">
            <span class="grado-header">Grado</span>
            <span class="horas-header">Horas Semanales</span>
          </div>
          <div class="grados-horas-items" id="editar-grados-horas-items">
            ${datos.grados.map(grado => {
              const gradoHoras = asignatura.gradosHoras.find(gh => gh.grado === grado.id)
              const checked = gradoHoras ? "checked" : ""
              const disabled = gradoHoras ? "" : "disabled"
              const horas = gradoHoras ? gradoHoras.horas : 1
              
              return `
                <div class="grado-horas-item">
                  <div>
                    <input type="checkbox" id="editar-grado-${grado.id}" class="grado-checkbox" value="${grado.id}" ${checked}>
                    <label for="editar-grado-${grado.id}">${grado.nombre}</label>
                  </div>
                  <div>
                    <input type="number" id="editar-horas-${grado.id}" class="horas-input" min="1" max="10" value="${horas}" ${disabled}>
                  </div>
                </div>
              `
            }).join("")}
          </div>
        </div>
      </div>
    </form>
  `
  
  // Agregar eventos para habilitar/deshabilitar inputs de horas
  document.querySelectorAll("#editar-grados-horas-items .grado-checkbox").forEach(checkbox => {
    const gradoId = checkbox.value;
    const horasInput = document.getElementById(`editar-horas-${gradoId}`);
    
    checkbox.addEventListener("change", function() {
      horasInput.disabled = !this.checked;
    });
  });
  
  modalGuardar.onclick = () => guardarEdicionAsignatura();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block"
}

function editarGrupo(grupoId) {
  const grupo = datos.grupos.find(g => g.id === grupoId);
  if (!grupo) return;
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Grupo`;
  
  modalContenido.innerHTML = `
    <form id="form-editar-grupo">
      <input type="hidden" id="editar-grupo-id" value="${grupo.id}">
      <div class="form-group">
        <label for="editar-grupo-grado">Grado:</label>
        <select id="editar-grupo-grado" required>
          <option value="">Seleccionar grado</option>
          ${datos.grados.map(grado => `
            <option value="${grado.id}" ${grado.id === grupo.grado ? "selected" : ""}>${grado.nombre}</option>
          `).join("")}
        </select>
      </div>
      <div class="form-group">
        <label for="editar-grupo-nombre">Nombre/Identificador:</label>
        <input type="text" id="editar-grupo-nombre" value="${grupo.nombre}" placeholder="Ej: A, B, C, 101, etc." required>
      </div>
    </form>
  `;
  
  modalGuardar.onclick = () => guardarEdicionGrupo();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block";
}

function editarGrado(gradoId) {
  const grado = datos.grados.find(g => g.id === gradoId);
  if (!grado) return
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Grado`
  
  modalContenido.innerHTML = `
    <form id="form-editar-grado">
      <input type="hidden" id="editar-grado-id" value="${grado.id}">
      <div class="form-group">
        <label for="editar-grado-nombre">Nombre:</label>
        <input type="text" id="editar-grado-nombre" value="${grado.nombre}" required>
      </div>
    </form>
  `
  
  modalGuardar.onclick = () => guardarEdicionGrado();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block"
}

function editarArea(areaId) {
  const area = datos.areas.find(a => a.id === areaId);
  if (!area) return
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Área`
  
  modalContenido.innerHTML = `
    <form id="form-editar-area">
      <input type="hidden" id="editar-area-id" value="${area.id}">
      <div class="form-group">
        <label for="editar-area-nombre">Nombre:</label>
        <input type="text" id="editar-area-nombre" value="${area.nombre}" required>
      </div>
      <div class="form-group">
        <label for="editar-area-color">Color:</label>
        <input type="color" id="editar-area-color" value="${area.color}" required>
      </div>
    </form>
  `
  
  modalGuardar.onclick = () => guardarEdicionArea();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block"
}

function editarHorarioBase(horarioBaseId) {
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Editar Horario Base: ${horarioBase.nombre}`
  
  modalContenido.innerHTML = `
    <form id="form-editar-horario-base">
      <input type="hidden" id="editar-horario-base-id" value="${horarioBase.id}">
      <div class="form-group">
        <label for="editar-horario-base-nombre">Nombre:</label>
        <input type="text" id="editar-horario-base-nombre" value="${horarioBase.nombre}" required>
      </div>
      <div class="form-group">
        <label for="editar-horario-base-hora-inicio">Hora de Inicio:</label>
        <input type="time" id="editar-horario-base-hora-inicio" value="${horarioBase.horaInicio}" required>
      </div>
      <div class="form-group">
        <label for="editar-horario-base-hora-fin">Hora de Fin:</label>
        <input type="time" id="editar-horario-base-hora-fin" value="${horarioBase.horaFin}" required>
      </div>
      <div class="form-group">
        <label for="editar-horario-base-duracion-bloque">Duración de Bloque (minutos):</label>
        <input type="number" id="editar-horario-base-duracion-bloque" min="30" max="120" step="5" value="${horarioBase.duracionBloque}" required>
      </div>
      <div class="form-group">
        <label>Días de la Semana:</label>
        <div class="checkbox-group" id="editar-dias-semana-container">
          ${["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(dia => `
            <div class="checkbox-item">
              <input type="checkbox" id="editar-dia-${dia}" class="dia-checkbox" value="${dia}" ${horarioBase.dias.includes(dia) ? "checked" : ""}>
              <label for="editar-dia-${dia}">${dia}</label>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="form-group">
        <label>Recesos:</label>
        <div class="recesos-container" id="editar-recesos-container">
          ${horarioBase.recesos.map(receso => `
            <div class="receso-item">
              <input type="time" class="receso-hora-inicio" value="${receso.horaInicio}" placeholder="Hora inicio">
              <input type="time" class="receso-hora-fin" value="${receso.horaFin}" placeholder="Hora fin">
              <input type="text" class="receso-nombre" value="${receso.nombre}" placeholder="Nombre (opcional)">
              <button type="button" class="btn-icon" onclick="eliminarReceso(this)"><i class="fas fa-trash"></i></button>
            </div>
          `).join("")}
        </div>
        <button type="button" class="btn btn-secondary" onclick="agregarRecesoEditar()"><i class="fas fa-plus"></i> Agregar Receso</button>
      </div>
      <div class="form-group">
        <label>Grupos:</label>
        <div id="editar-grupos-container">
          ${datos.grados.map(grado => {
            const gruposGrado = datos.grupos.filter(g => g.grado === grado.id)
            
            if (gruposGrado.length === 0) return ""
            
            return `
              <div class="grado-grupos">
                <h4>${grado.nombre}</h4>
                <div class="checkbox-group">
                  ${gruposGrado.map(grupo => `
                    <div class="checkbox-item">
                      <input type="checkbox" id="editar-grupo-${grupo.id}" class="grupo-checkbox" value="${grupo.id}" ${horarioBase.grupos.includes(grupo.id) ? "checked" : ""}>
                      <label for="editar-grupo-${grupo.id}">${grupo.nombre}</label>
                    </div>
                  `).join("")}
                </div>
              </div>
            `
          }).join("")}
        </div>
      </div>
    </form>
  `;
  
  modalGuardar.onclick = () => guardarEdicionHorarioBase();
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block"
}

// =========================================
// PANELES DE ELIMINACIÓN DE INSTANCIAS
// =========================================

function eliminarDocente(docenteId) {
  // Eliminar asignaciones asociadas
  datos.asignaciones = datos.asignaciones.filter(a => a.docente !== docenteId);
  
  // Eliminar docente
  datos.docentes = datos.docentes.filter(d => d.id !== docenteId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaDocentes();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

function eliminarAsignatura(asignaturaId) {
  // Eliminar asignaciones asociadas
  datos.asignaciones = datos.asignaciones.filter(a => a.asignatura !== asignaturaId);
  
  // Eliminar asignatura
  datos.asignaturas = datos.asignaturas.filter(a => a.id !== asignaturaId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAsignaturas();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

function eliminarGrupo(grupoId) {
  // Eliminar asignaciones asociadas
  datos.asignaciones = datos.asignaciones.filter(a => a.grupo !== grupoId);
  
  // Eliminar referencia en docentes (director de grupo)
  datos.docentes.forEach(docente => {
    if (docente.directorGrupo === grupoId) {
      docente.directorGrupo = null
    }
  });
  
  // Eliminar grupo
  datos.grupos = datos.grupos.filter(g => g.id !== grupoId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrupos();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

function eliminarGrado(gradoId) {
  // Eliminar grado
  datos.grados = datos.grados.filter(g => g.id !== gradoId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrados();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

function eliminarArea(areaId) {
  // Eliminar área
  datos.areas = datos.areas.filter(a => a.id !== areaId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAreas();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

function eliminarHorarioBase(horarioBaseId) {
  // Eliminar horario base
  datos.horariosBase = datos.horariosBase.filter(h => h.id !== horarioBaseId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar lista de horarios base
  cargarHorariosBase();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
}

// =========================================
// GUARDADO DE EDICIONES DE INSTANCIAS
// =========================================

// Reemplaza la función guardarEdicionDocente
function guardarEdicionDocenteCompleta() {
  const docenteId = document.getElementById("editar-docente-id").value;
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return;
  
  // Obtener datos del formulario
  const nombre = document.getElementById("editar-docente-nombre").value;
  const maxHoras = parseInt(document.getElementById("editar-docente-max-horas").value);
  const directorGrupo = document.getElementById("editar-docente-director-grupo").value;
  
  // Obtener restricciones
  const restricciones = [];
  const restriccionesItems = document.querySelectorAll("#editar-restricciones-container .restriccion-item");
  
  restriccionesItems.forEach(item => {
    const dia = item.querySelector(".restriccion-dia").value;
    const horaInicio = item.querySelector(".restriccion-hora-inicio").value;
    const horaFin = item.querySelector(".restriccion-hora-fin").value;
    
    if (dia && horaInicio && horaFin) {
      restricciones.push({
        dia,
        horaInicio,
        horaFin
      });
    }
  });
  
  // Obtener asignaturas y grupos
  const asignaturasGrupos = [];
  const asignaturaItems = document.querySelectorAll("#editar-asignaturas-container .asignatura-grupo-item");
  
  asignaturaItems.forEach(item => {
    const asignaturaSelect = item.querySelector(".asignatura-select");
    if (!asignaturaSelect || !asignaturaSelect.value) return;
    
    const asignaturaId = asignaturaSelect.value;
    const gruposCheckboxes = item.querySelectorAll(".grupo-checkbox:checked");
    
    const grupos = Array.from(gruposCheckboxes).map(checkbox => checkbox.value);
    
    if (grupos.length > 0) {
      asignaturasGrupos.push({
        asignatura: asignaturaId,
        grupos
      });
    }
  });
  
  // Eliminar asignaciones anteriores del docente
  datos.asignaciones = datos.asignaciones.filter(a => a.docente !== docenteId);
  
  // Actualizar docente
  docente.nombre = nombre;
  docente.maxHoras = maxHoras;
  docente.restricciones = restricciones;
  docente.directorGrupo = directorGrupo || null;
  docente.asignaturasGrupos = asignaturasGrupos;
  
  // Crear nuevas asignaciones académicas
  asignaturasGrupos.forEach(ag => {
    const asignatura = datos.asignaturas.find(a => a.id === ag.asignatura);
    
    ag.grupos.forEach(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return;
      
      // Encontrar las horas semanales para este grado
      const gradoHoras = asignatura.gradosHoras.find(gh => gh.grado === grupo.grado);
      if (!gradoHoras) return;
      
      // Crear asignación
      const nuevaAsignacion = {
        id: generateId(),
        grupo: grupoId,
        asignatura: ag.asignatura,
        docente: docenteId,
        horasSemanales: gradoHoras.horas,
        bloqueMaximo: Math.ceil(gradoHoras.horas / 2)
      };
      
      datos.asignaciones.push(nuevaAsignacion);
    });
  });
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaDocentes();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Docente actualizado correctamente");
}

// Reemplaza la función guardarEdicionAsignatura
function guardarEdicionAsignatura() {
  const asignaturaId = document.getElementById("editar-asignatura-id").value;
  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  if (!asignatura) return;
  
  // Obtener datos del formulario
  const identificador = document.getElementById("editar-asignatura-identificador").value;
  const nombre = document.getElementById("editar-asignatura-nombre").value;
  const area = document.getElementById("editar-asignatura-area").value;
  
  // Verificar si el identificador ya existe en otra asignatura
  if (datos.asignaturas.some(a => a.id !== asignaturaId && a.identificador === identificador)) {
    notificarAdvertencia("Ya existe otra asignatura con ese identificador");
    return;
  }
  
  // Obtener grados y horas
  const gradosHoras = [];
  const gradosCheckboxes = document.querySelectorAll("#editar-grados-horas-items .grado-checkbox:checked");
  
  gradosCheckboxes.forEach(checkbox => {
    const gradoId = checkbox.value;
    const horas = parseInt(document.getElementById(`editar-horas-${gradoId}`).value);
    
    gradosHoras.push({
      grado: gradoId,
      horas
    });
  });
  
  // Verificar que se haya seleccionado al menos un grado
  if (gradosHoras.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un grado");
    return;
  }
  
  // Actualizar asignatura
  asignatura.identificador = identificador;
  asignatura.nombre = nombre;
  asignatura.area = area;
  asignatura.gradosHoras = gradosHoras;
  
  // Actualizar asignaciones
  datos.asignaciones.forEach(asignacion => {
    if (asignacion.asignatura === asignaturaId) {
      const grupo = datos.grupos.find(g => g.id === asignacion.grupo);
      if (grupo) {
        const gradoHoras = gradosHoras.find(gh => gh.grado === grupo.grado);
        if (gradoHoras) {
          asignacion.horasSemanales = gradoHoras.horas;
          asignacion.bloqueMaximo = Math.ceil(gradoHoras.horas / 2);
        }
      }
    }
  });
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAsignaturas();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Asignatura actualizada correctamente");
}

// Reemplaza la función guardarEdicionGrupo
function guardarEdicionGrupo() {
  const grupoId = document.getElementById("editar-grupo-id").value;
  const grupo = datos.grupos.find(g => g.id === grupoId);
  if (!grupo) return;
  
  // Obtener datos del formulario
  const grado = document.getElementById("editar-grupo-grado").value;
  const nombre = document.getElementById("editar-grupo-nombre").value;
  
  // Verificar si ya existe otro grupo con el mismo nombre en el mismo grado
  if (datos.grupos.some(g => g.id !== grupoId && g.grado === grado && g.nombre === nombre)) {
    notificarAdvertencia("Ya existe otro grupo con ese nombre en el grado seleccionado");
    return;
  }
  
  // Actualizar grupo
  grupo.grado = grado;
  grupo.nombre = nombre;
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrupos();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Grupo actualizado correctamente");
}

// Reemplaza la función guardarEdicionGrado
function guardarEdicionGrado() {
  const gradoId = document.getElementById("editar-grado-id").value;
  const grado = datos.grados.find(g => g.id === gradoId);
  if (!grado) return;
  
  // Obtener datos del formulario
  const nombre = document.getElementById("editar-grado-nombre").value;
  
  // Verificar si ya existe otro grado con el mismo nombre
  if (datos.grados.some(g => g.id !== gradoId && g.nombre === nombre)) {
    notificarAdvertencia("Ya existe otro grado con ese nombre");
    return;
  }
  
  // Actualizar grado
  grado.nombre = nombre;
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaGrados();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Grado actualizado correctamente");
}

// Reemplaza la función guardarEdicionArea
function guardarEdicionArea() {
  const areaId = document.getElementById("editar-area-id").value;
  const area = datos.areas.find(a => a.id === areaId);
  if (!area) return;
  
  // Obtener datos del formulario
  const nombre = document.getElementById("editar-area-nombre").value;
  const color = document.getElementById("editar-area-color").value;
  
  // Verificar si ya existe otra área con el mismo nombre
  if (datos.areas.some(a => a.id !== areaId && a.nombre === nombre)) {
    notificarAdvertencia("Ya existe otra área con ese nombre");
    return;
  }
  
  // Actualizar área
  area.nombre = nombre;
  area.color = color;
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar tabla
  cargarTablaAreas();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Área actualizada correctamente");
}

// Reemplaza la función guardarEdicionHorarioBase
function guardarEdicionHorarioBase() {
  const horarioBaseId = document.getElementById("editar-horario-base-id").value;
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Obtener datos del formulario
  const nombre = document.getElementById("editar-horario-base-nombre").value;
  const horaInicio = document.getElementById("editar-horario-base-hora-inicio").value;
  const horaFin = document.getElementById("editar-horario-base-hora-fin").value;
  const duracionBloque = parseInt(document.getElementById("editar-horario-base-duracion-bloque").value);
  
  // Obtener días seleccionados
  const dias = [];
  document.querySelectorAll("#editar-dias-semana-container .dia-checkbox:checked").forEach(checkbox => {
    dias.push(checkbox.value);
  });
  
  // Verificar que se haya seleccionado al menos un día
  if (dias.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un día de la semana");
    return;
  }
  
  // Obtener recesos
  const recesos = [];
  document.querySelectorAll("#editar-recesos-container .receso-item").forEach(item => {
    const horaInicio = item.querySelector(".receso-hora-inicio").value;
    const horaFin = item.querySelector(".receso-hora-fin").value;
    const nombre = item.querySelector(".receso-nombre").value;
    
    if (horaInicio && horaFin) {
      recesos.push({
        horaInicio,
        horaFin,
        nombre: nombre || "Receso"
      });
    }
  });
  
  // Obtener grupos seleccionados
  const grupos = [];
  document.querySelectorAll("#editar-grupos-container .grupo-checkbox:checked").forEach(checkbox => {
    grupos.push(checkbox.value);
  });
  
  // Verificar que se haya seleccionado al menos un grupo
  if (grupos.length === 0) {
    notificarAdvertencia("Debe seleccionar al menos un grupo");
    return;
  }
  
  // Actualizar horario base
  horarioBase.nombre = nombre;
  horarioBase.horaInicio = horaInicio;
  horarioBase.horaFin = horaFin;
  horarioBase.duracionBloque = duracionBloque;
  horarioBase.dias = dias;
  horarioBase.recesos = recesos;
  horarioBase.grupos = grupos;
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar lista de horarios base
  cargarHorariosBase();
  
  // Cerrar modal
  cerrarModal("modal-editar");
  
  // Mostrar notificación
  notificarExito("Horario base actualizado correctamente");
}

// =========================================
// CONFIRMAR ELIMINACIÓN DE INSTANCIAS
// =========================================

function confirmarEliminarDocente(docenteId) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  modalMensaje.textContent = `¿Está seguro de eliminar al docente "${docente.nombre}"? Esta acción no se puede deshacer y eliminará todas las asignaciones asociadas.`
  
  modalConfirmar.onclick = () => eliminarDocente(docenteId);
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

function confirmarEliminarAsignatura(asignaturaId) {
  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  if (!asignatura) return
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  modalMensaje.textContent = `¿Está seguro de eliminar la asignatura "${asignatura.nombre}"? Esta acción no se puede deshacer y eliminará todas las asignaciones asociadas.`
  
  modalConfirmar.onclick = () => eliminarAsignatura(asignaturaId);
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

function confirmarEliminarGrupo(grupoId) {
  const grupo = datos.grupos.find(g => g.id === grupoId);
  if (!grupo) return
  
  const grado = datos.grados.find(g => g.id === grupo.grado);
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  modalMensaje.textContent = `¿Está seguro de eliminar el grupo "${grado?.nombre || ""} ${grupo.nombre}"? Esta acción no se puede deshacer y eliminará todas las asignaciones asociadas.`
  
  modalConfirmar.onclick = () => eliminarGrupo(grupoId);
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

function confirmarEliminarGrado(gradoId) {
  const grado = datos.grados.find(g => g.id === gradoId);
  if (!grado) return
  
  // Verificar si hay grupos asociados
  const gruposAsociados = datos.grupos.filter(g => g.grado === gradoId);
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  
  if (gruposAsociados.length > 0) {
    modalMensaje.textContent = `No se puede eliminar el grado "${grado.nombre}" porque tiene ${gruposAsociados.length} grupos asociados. Elimine los grupos primero.`
    
    // Cambiar el botón de confirmar por uno de aceptar
    modalConfirmar.textContent = "Aceptar";
    modalConfirmar.onclick = () => cerrarModal("modal-confirmacion");
  } else {
    modalMensaje.textContent = `¿Está seguro de eliminar el grado "${grado.nombre}"? Esta acción no se puede deshacer.`
    
    // Restaurar el botón de confirmar
    modalConfirmar.textContent = "Confirmar";
    modalConfirmar.onclick = () => eliminarGrado(gradoId);
  }
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

function confirmarEliminarArea(areaId) {
  const area = datos.areas.find(a => a.id === areaId);
  if (!area) return
  
  // Verificar si hay asignaturas asociadas
  const asignaturasAsociadas = datos.asignaturas.filter(a => a.area === areaId);
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  
  if (asignaturasAsociadas.length > 0) {
    modalMensaje.textContent = `No se puede eliminar el área "${area.nombre}" porque tiene ${asignaturasAsociadas.length} asignaturas asociadas. Elimine las asignaturas primero.`
    
    // Cambiar el botón de confirmar por uno de aceptar
    modalConfirmar.textContent = "Aceptar";
    modalConfirmar.onclick = () => cerrarModal("modal-confirmacion");
  } else {
    modalMensaje.textContent = `¿Está seguro de eliminar el área "${area.nombre}"? Esta acción no se puede deshacer.`
    
    // Restaurar el botón de confirmar
    modalConfirmar.textContent = "Confirmar";
    modalConfirmar.onclick = () => eliminarArea(areaId);
  }
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

function confirmarEliminarHorarioBase(horarioBaseId) {
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  modalMensaje.textContent = `¿Está seguro de eliminar el horario base "${horarioBase.nombre}"? Esta acción no se puede deshacer.`
  
  modalConfirmar.onclick = () => eliminarHorarioBase(horarioBaseId);
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block"
}

// =========================================
// CARGA DE TABLAS DE PANELES DE INSTANCIAS
// =========================================

function cargarTablaDocentes() {
  const tabla = document.getElementById("tabla-docentes");
  const tbody = tabla.querySelector("tbody");
  
  if (datos.docentes.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="4">No hay docentes registrados</td></tr>';
    return
  }
  
  tbody.innerHTML = "";
  
  datos.docentes.forEach(docente => {
    const tr = document.createElement("tr");
    
    // Obtener nombre del grupo si es director
    let directorDe = "";
    if (docente.directorGrupo) {
      const grupo = datos.grupos.find(g => g.id === docente.directorGrupo);
      if (grupo) {
        const grado = datos.grados.find(g => g.id === grupo.grado);
        directorDe = `Director de ${grado?.nombre || ""} ${grupo.nombre}`
      }
    }
    
    // Contar asignaciones
    const asignacionesCount = datos.asignaciones.filter(a => a.docente === docente.id).length;
    
    tr.innerHTML = `
      <td>
        ${docente.nombre}
        ${directorDe ? `<br><small class="badge">${directorDe}</small>` : ""}
      </td>
      <td>${docente.restricciones.length}</td>
      <td>${docente.maxHoras} horas</td>
      <td class="table-actions-cell">
        <button class="btn-icon" onclick="verHorarioDocente('${docente.id}')"><i class="fas fa-calendar-alt"></i></button>
        <button class="btn-icon" onclick="editarDocente('${docente.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="confirmarEliminarDocente('${docente.id}')"><i class="fas fa-trash"></i></button>
      </td>
    `
    
    tbody.appendChild(tr);
  });
}

function cargarTablaAsignaturas() {
  const tabla = document.getElementById("tabla-asignaturas");
  const tbody = tabla.querySelector("tbody");
  
  // Cargar filtros de áreas
  cargarFiltrosAreas();
  
  if (datos.asignaturas.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No hay asignaturas registradas</td></tr>';
    return;
  }
  
  tbody.innerHTML = "";
  
  datos.asignaturas.forEach(asignatura => {
    const tr = document.createElement("tr");
    
    // Obtener área
    const area = datos.areas.find(a => a.id === asignatura.area);
    
    // Obtener grados aplicables
    const gradosAplicables = asignatura.gradosHoras.map(gh => {
      const grado = datos.grados.find(g => g.id === gh.grado);
      return grado ? `${grado.nombre} (${gh.horas}h)` : "";
    }).join(", ");
    
    tr.innerHTML = `
      <td>${asignatura.identificador}</td>
      <td>${asignatura.nombre}</td>
      <td>${area?.nombre || "Sin área"}</td>
      <td>
        <div style="width: 20px; height: 20px; background-color: ${area?.color || "#cccccc"}; border-radius: 50%; display: inline-block;"></div>
      </td>
      <td>${gradosAplicables}</td>
      <td class="table-actions-cell">
        <button class="btn-icon" onclick="editarAsignatura('${asignatura.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="confirmarEliminarAsignatura('${asignatura.id}')"><i class="fas fa-trash"></i></button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

function cargarTablaGrupos() {
  const tabla = document.getElementById("tabla-grupos");
  const tbody = tabla.querySelector("tbody");
  
  // Cargar filtros
  const filtroGrado = document.getElementById("filtro-grado-grupo");
  if (filtroGrado) {
    filtroGrado.innerHTML = '<option value="">Todos los grados</option>';
    datos.grados.forEach(grado => {
      filtroGrado.innerHTML += `<option value="${grado.id}">${grado.nombre}</option>`;
    });
  }
  
  if (datos.grupos.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="4">No hay grupos registrados</td></tr>';
    return;
  }
  
  tbody.innerHTML = "";
  
  datos.grupos.forEach(grupo => {
    const tr = document.createElement("tr");
    
    // Obtener grado
    const grado = datos.grados.find(g => g.id === grupo.grado);
    
    // Obtener director de grupo
    const director = datos.docentes.find(d => d.directorGrupo === grupo.id);
    
    tr.innerHTML = `
      <td>${grado?.nombre || "Sin grado"}</td>
      <td>${grupo.nombre}</td>
      <td>${director?.nombre || "Sin director"}</td>
      <td class="table-actions-cell">
        <button class="btn-icon" onclick="verGrupo('${grupo.id}')"><i class="fas fa-eye"></i></button>
        <button class="btn-icon" onclick="editarGrupo('${grupo.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="confirmarEliminarGrupo('${grupo.id}')"><i class="fas fa-trash"></i></button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

function cargarTablaGrados() {
  const tabla = document.getElementById("tabla-grados");
  const tbody = tabla.querySelector("tbody");
  
  if (datos.grados.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="3">No hay grados registrados</td></tr>';
    return
  }
  
  tbody.innerHTML = "";
  
  datos.grados.forEach(grado => {
    const tr = document.createElement("tr");
    
    // Contar grupos en este grado
    const gruposCount = datos.grupos.filter(g => g.grado === grado.id).length;
    
    tr.innerHTML = `
      <td>${grado.nombre}</td>
      <td>${gruposCount}</td>
      <td class="table-actions-cell">
        <button class="btn-icon" onclick="editarGrado('${grado.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="confirmarEliminarGrado('${grado.id}')"><i class="fas fa-trash"></i></button>
      </td>
    `
    
    tbody.appendChild(tr);
  });
}

function cargarTablaAreas() {
  const tabla = document.getElementById("tabla-areas");
  const tbody = tabla.querySelector("tbody");
  
  if (datos.areas.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="4">No hay áreas registradas</td></tr>';
    return
  }
  
  tbody.innerHTML = "";
  
  datos.areas.forEach(area => {
    const tr = document.createElement("tr");
    
    // Contar asignaturas en esta área
    const asignaturasCount = datos.asignaturas.filter(a => a.area === area.id).length;
    
    tr.innerHTML = `
      <td>${area.nombre}</td>
      <td>
        <div style="width: 20px; height: 20px; background-color: ${area.color}; border-radius: 50%; display: inline-block;"></div>
      </td>
      <td>${asignaturasCount}</td>
      <td class="table-actions-cell">
        <button class="btn-icon" onclick="editarArea('${area.id}')"><i class="fas fa-edit"></i></button>
        <button class="btn-icon" onclick="confirmarEliminarArea('${area.id}')"><i class="fas fa-trash"></i></button>
      </td>
    `
    
    tbody.appendChild(tr);
  });
}

// La carga de Horarios Base no es necesaria en formato de Tabla

function cargarTablaAsignaciones() {
  const tabla = document.getElementById("tabla-asignaciones");
  
  if (!tabla) {
    console.error("Tabla de asignaciones no encontrada");
    return;
  }
  
  const tbody = tabla.querySelector("tbody");
  
  // Cargar filtros
  const filtroGrupo = document.getElementById("filtro-grupo-asignacion");
  const filtroDocente = document.getElementById("filtro-docente-asignacion");
  
  if (filtroGrupo) {
    filtroGrupo.innerHTML = '<option value="">Todos los grupos</option>';
    datos.grupos.forEach(grupo => {
      const grado = datos.grados.find(g => g.id === grupo.grado);
      filtroGrupo.innerHTML += `<option value="${grupo.id}">${grado?.nombre || ""} ${grupo.nombre}</option>`;
    });
  }
  
  if (filtroDocente) {
    filtroDocente.innerHTML = '<option value="">Todos los docentes</option>';
    datos.docentes.forEach(docente => {
      filtroDocente.innerHTML += `<option value="${docente.id}">${docente.nombre}</option>`;
    });
  }
  
  if (datos.asignaciones.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="5">No hay asignaciones registradas</td></tr>';
    return;
  }
  
  tbody.innerHTML = "";
  
  datos.asignaciones.forEach(asignacion => {
    const tr = document.createElement("tr");
    
    // Obtener grupo
    const grupo = datos.grupos.find(g => g.id === asignacion.grupo);
    const grado = grupo ? datos.grados.find(g => g.id === grupo.grado) : null;
    
    // Obtener asignatura
    const asignatura = datos.asignaturas.find(a => a.id === asignacion.asignatura);
    
    // Obtener docente
    const docente = datos.docentes.find(d => d.id === asignacion.docente);
    
    tr.innerHTML = `
      <td>${grado?.nombre || ""} ${grupo?.nombre || "Sin grupo"}</td>
      <td>${asignatura?.nombre || "Sin asignatura"}</td>
      <td>${docente?.nombre || "Sin docente"}</td>
      <td>${asignacion.horasSemanales}</td>
      <td>${asignacion.bloqueMaximo}</td>
    `;
    
    tbody.appendChild(tr);
  });
  
  // Agregar eventos para filtros
  if (filtroGrupo) {
    filtroGrupo.addEventListener("change", filtrarAsignaciones);
  }
  if (filtroDocente) {
    filtroDocente.addEventListener("change", filtrarAsignaciones);
  }
  
  const buscarAsignacion = document.getElementById("buscar-asignacion");
  if (buscarAsignacion) {
    buscarAsignacion.addEventListener("input", filtrarAsignaciones);
  }
}

// =========================================
// FORMULARIO DE DOCENTES - FUNCIONES DE SUBINSTANCIAS
// =========================================

function agregarAsignaturaDocente() {
  const asignaturasContainer = document.getElementById("asignaturas-container");
  const index = asignaturasContainer.children.length;

  const asignaturaItem = document.createElement("div");
  asignaturaItem.className = "asignatura-grupo-item";
  asignaturaItem.innerHTML = `
    <label>Asignatura:</label>
    <select class="asignatura-select" onchange="cargarGruposParaAsignatura(this, ${index})">
      <option value="">Seleccionar asignatura</option>
      ${datos.asignaturas.map(asignatura => `
        <option value="${asignatura.id}">${asignatura.nombre}</option>
      `).join("")}
    </select>
    
    <div class="grados-grupos">
      <h4>Grupos:</h4>
      <div class="grupos-container" id="grupos-container-${index}">
        <p class="empty-state">Seleccione una asignatura primero</p>
      </div>
    </div>
    
    <button type="button" class="btn-icon" onclick="eliminarAsignaturaDocente(this)">
      <i class="fas fa-trash"></i>
    </button>
  `

  asignaturasContainer.appendChild(asignaturaItem);
}

function agregarAsignaturaDocenteEditar() {
  const asignaturasContainer = document.getElementById("editar-asignaturas-container");
  const index = asignaturasContainer.children.length;

  const asignaturaItem = document.createElement("div");
  asignaturaItem.className = "asignatura-grupo-item";
  asignaturaItem.innerHTML = `
    <label>Asignatura:</label>
    <select class="asignatura-select" onchange="cargarGruposParaAsignaturaEditar(this, ${index})">
      <option value="">Seleccionar asignatura</option>
      ${datos.asignaturas.map(asignatura => `
        <option value="${asignatura.id}">${asignatura.nombre}</option>
      `).join("")}
    </select>
    
    <div class="grados-grupos">
      <h4>Grupos:</h4>
      <div class="grupos-container" id="editar-grupos-container-${index}">
        <p class="empty-state">Seleccione una asignatura primero</p>
      </div>
    </div>
    
    <button type="button" class="btn-icon" onclick="eliminarAsignaturaDocenteEditar(this)">
      <i class="fas fa-trash"></i>
    </button>
  `;

  asignaturasContainer.appendChild(asignaturaItem);
}

function eliminarAsignaturaDocente(button) {
  const asignaturaItem = button.parentElement;
  asignaturaItem.remove();
}

function eliminarAsignaturaDocenteEditar(button) {
  const asignaturaItem = button.parentElement;
  asignaturaItem.remove();
}

function cargarGruposParaAsignatura(select, index) {
  const asignaturaId = select.value;
  if (!asignaturaId) return

  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  if (!asignatura) return

  const gruposContainer = document.getElementById(`grupos-container-${index}`);
  gruposContainer.innerHTML = "";

  // Agrupar grupos por grado
  const gruposPorGrado = {}
  
  datos.grupos.forEach(grupo => {
    const grado = datos.grados.find(g => g.id === grupo.grado);
    if (!grado) return

    // Verificar si la asignatura aplica para este grado
    const gradoAplicable = asignatura.gradosHoras.find(gh => gh.grado === grado.id);
    if (!gradoAplicable) return

    if (!gruposPorGrado[grado.id]) {
      gruposPorGrado[grado.id] = {
        grado: grado,
        grupos: []
      }
    }
    
    gruposPorGrado[grado.id].grupos.push(grupo);
  });

  // Si no hay grupos aplicables
  if (Object.keys(gruposPorGrado).length === 0) {
    gruposContainer.innerHTML = '<p class="empty-state">No hay grupos aplicables para esta asignatura</p>';
    return
  }

  // Crear checkboxes por grado
  Object.values(gruposPorGrado).forEach(item => {
    const gradoDiv = document.createElement("div");
    gradoDiv.className = "grado-grupos";
    gradoDiv.innerHTML = `<h4>${item.grado.nombre}</h4>`

    const checkboxGroup = document.createElement("div");
    checkboxGroup.className = "checkbox-group";

    item.grupos.forEach(grupo => {
      const checkboxItem = document.createElement("div")
      checkboxItem.className = "checkbox-item"
      checkboxItem.innerHTML = `
        <input type="checkbox" id="grupo-${index}-${grupo.id}" class="grupo-checkbox" value="${grupo.id}" data-asignatura="${asignaturaId}">
        <label for="grupo-${index}-${grupo.id}">${grupo.nombre}</label>
      `
      checkboxGroup.appendChild(checkboxItem)
    })

    gradoDiv.appendChild(checkboxGroup);
    gruposContainer.appendChild(gradoDiv);
  });
}

function cargarGruposParaAsignaturaEditar(select, index) {
  const asignaturaId = select.value;
  if (!asignaturaId) return;

  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  if (!asignatura) return;

  const gruposContainer = document.getElementById(`editar-grupos-container-${index}`);
  gruposContainer.innerHTML = "";

  // Agrupar grupos por grado
  const gruposPorGrado = {};
  
  datos.grupos.forEach(grupo => {
    const grado = datos.grados.find(g => g.id === grupo.grado);
    if (!grado) return;

    // Verificar si la asignatura aplica para este grado
    const gradoAplicable = asignatura.gradosHoras.find(gh => gh.grado === grado.id);
    if (!gradoAplicable) return;

    if (!gruposPorGrado[grado.id]) {
      gruposPorGrado[grado.id] = {
        grado: grado,
        grupos: []
      };
    }
    
    gruposPorGrado[grado.id].grupos.push(grupo);
  });

  // Si no hay grupos aplicables
  if (Object.keys(gruposPorGrado).length === 0) {
    gruposContainer.innerHTML = '<p class="empty-state">No hay grupos aplicables para esta asignatura</p>';
    return;
  }

  // Crear checkboxes por grado
  Object.values(gruposPorGrado).forEach(item => {
    const gradoDiv = document.createElement("div");
    gradoDiv.className = "grado-grupos";
    gradoDiv.innerHTML = `<h4>${item.grado.nombre}</h4>`;

    const checkboxGroup = document.createElement("div");
    checkboxGroup.className = "checkbox-group";

    item.grupos.forEach(grupo => {
      const checkboxItem = document.createElement("div");
      checkboxItem.className = "checkbox-item";
      checkboxItem.innerHTML = `
        <input type="checkbox" id="editar-grupo-${index}-${grupo.id}" class="grupo-checkbox" value="${grupo.id}" data-asignatura="${asignaturaId}">
        <label for="editar-grupo-${index}-${grupo.id}">${grupo.nombre}</label>
      `;
      checkboxGroup.appendChild(checkboxItem);
    });

    gradoDiv.appendChild(checkboxGroup);
    gruposContainer.appendChild(gradoDiv);
  });
}

function agregarRestriccion(containerId) {
  const container = document.getElementById(containerId);
  
  const restriccionItem = document.createElement("div");
  restriccionItem.className = "restriccion-item";
  restriccionItem.innerHTML = `
    <select class="restriccion-dia">
      <option value="">Seleccionar día</option>
      <option value="Lunes">Lunes</option>
      <option value="Martes">Martes</option>
      <option value="Miércoles">Miércoles</option>
      <option value="Jueves">Jueves</option>
      <option value="Viernes">Viernes</option>
      <option value="Sábado">Sábado</option>
    </select>
    <input type="time" class="restriccion-hora-inicio" placeholder="Hora inicio">
    <input type="time" class="restriccion-hora-fin" placeholder="Hora fin">
    <button type="button" class="btn-icon" onclick="eliminarRestriccion(this)"><i class="fas fa-trash"></i></button>
  `
  
  container.appendChild(restriccionItem);
}

function eliminarRestriccion(button) {
  const restriccionItem = button.parentElement;
  restriccionItem.remove();
}

// =========================================
// DOCENTES - FUNCIONES
// =========================================

function filtrarDocentes() {
  const busqueda = document.getElementById("buscar-docente").value.toLowerCase();
  const tabla = document.getElementById("tabla-docentes");
  const filas = tabla.querySelectorAll("tbody tr:not(.empty-row)");
  
  let hayResultados = false;
  
  filas.forEach(fila => {
    const nombre = fila.cells[0].textContent.toLowerCase();
    
    if (nombre.includes(busqueda)) {
      fila.style.display = "";
      hayResultados = true;
    } else {
      fila.style.display = "none";
    }
  });
  
  // Mostrar mensaje si no hay resultados
  const emptyRow = tabla.querySelector("tbody tr.empty-row");
  if (emptyRow) {
    emptyRow.style.display = hayResultados ? "none" : "";
    if (!hayResultados) {
      emptyRow.cells[0].textContent = "No se encontraron docentes con ese criterio";
    }
  }
}

// =========================================
// ASIGNATURAS - FUNCIONES
// =========================================

function filtrarAsignaturas() {
  const busqueda = document.getElementById("buscar-asignatura").value.toLowerCase();
  const filtroArea = document.getElementById("filtro-area-asignatura").value;
  
  const tabla = document.getElementById("tabla-asignaturas");
  const filas = tabla.querySelectorAll("tbody tr:not(.empty-row)");
  
  let hayResultados = false;
  
  filas.forEach(fila => {
    const nombre = fila.cells[1].textContent.toLowerCase();
    const identificador = fila.cells[0].textContent.toLowerCase();
    const area = fila.cells[2].textContent.toLowerCase();
    
    const coincideBusqueda = nombre.includes(busqueda) || identificador.includes(busqueda);
    const coincideArea = !filtroArea || area.includes(filtroArea.toLowerCase());
    
    if (coincideBusqueda && coincideArea) {
      fila.style.display = "";
      hayResultados = true;
    } else {
      fila.style.display = "none";
    }
  });
  
  // Mostrar mensaje si no hay resultados
  const emptyRow = tabla.querySelector("tbody tr.empty-row");
  if (emptyRow) {
    emptyRow.style.display = hayResultados ? "none" : "";
    if (!hayResultados) {
      emptyRow.cells[0].textContent = "No se encontraron asignaturas con esos criterios";
    }
  }
}

// =========================================
// GRUPOS - FUNCIONES
// =========================================

function filtrarGrupos() {
  const busqueda = document.getElementById("buscar-grupo").value.toLowerCase();
  const filtroGrado = document.getElementById("filtro-grado").value;
  
  const tabla = document.getElementById("tabla-grupos");
  const filas = tabla.querySelectorAll("tbody tr:not(.empty-row)");
  
  let hayResultados = false;
  
  filas.forEach(fila => {
    const grado = fila.cells[0].textContent.toLowerCase();
    const nombre = fila.cells[1].textContent.toLowerCase();
    const director = fila.cells[2].textContent.toLowerCase();
    
    const coincideBusqueda = nombre.includes(busqueda) || director.includes(busqueda);
    const coincideGrado = !filtroGrado || grado.includes(filtroGrado.toLowerCase());
    
    if (coincideBusqueda && coincideGrado) {
      fila.style.display = "";
      hayResultados = true;
    } else {
      fila.style.display = "none";
    }
  });
  
  // Mostrar mensaje si no hay resultados
  const emptyRow = tabla.querySelector("tbody tr.empty-row");
  if (emptyRow) {
    emptyRow.style.display = hayResultados ? "none" : "";
    if (!hayResultados) {
      emptyRow.cells[0].textContent = "No se encontraron grupos con esos criterios";
    }
  }
}

// =========================================
// ESCUELA - FUNCIONES
// =========================================

function cargarFiltrosAreas() {
  const filtroArea = document.getElementById("filtro-area-asignatura");
  if (filtroArea) {
    filtroArea.innerHTML = '<option value="">Todas las áreas</option>';
    datos.areas.forEach(area => {
      filtroArea.innerHTML += `<option value="${area.id}">${area.nombre}</option>`;
    });
  }
}

// =========================================
// HORARIOS BASE - FUNCIONES
// =========================================

function agregarReceso() {
  const recesosContainer = document.getElementById("recesos-container");
  
  const recesoItem = document.createElement("div");
  recesoItem.className = "receso-item";
  recesoItem.innerHTML = `
    <input type="time" class="receso-hora-inicio" placeholder="Hora inicio">
    <input type="time" class="receso-hora-fin" placeholder="Hora fin">
    <input type="text" class="receso-nombre" placeholder="Nombre (opcional)">
    <button type="button" class="btn-icon" onclick="eliminarReceso(this)"><i class="fas fa-trash"></i></button>
  `;
  
  recesosContainer.appendChild(recesoItem);
}

function agregarRecesoEditar() {
  const recesosContainer = document.getElementById("editar-recesos-container");
  
  const recesoItem = document.createElement("div");
  recesoItem.className = "receso-item";
  recesoItem.innerHTML = `
    <input type="time" class="receso-hora-inicio" placeholder="Hora inicio">
    <input type="time" class="receso-hora-fin" placeholder="Hora fin">
    <input type="text" class="receso-nombre" placeholder="Nombre (opcional)">
    <button type="button" class="btn-icon" onclick="eliminarReceso(this)"><i class="fas fa-trash"></i></button>
  `;
  
  recesosContainer.appendChild(recesoItem);
}

function eliminarReceso(button) {
  const recesoItem = button.parentElement;
  recesoItem.remove();
}

// Reemplaza la función cargarHorariosBase
function cargarHorariosBase() {
  const container = document.getElementById("horarios-base-grid");
  
  if (!container) {
    console.error("Elemento horarios-base-grid no encontrado");
    return;
  }
  
  if (datos.horariosBase.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay horarios base registrados</div>';
    return;
  }
  
  container.innerHTML = "";
  
  datos.horariosBase.forEach(horarioBase => {
    const card = document.createElement("div");
    card.className = "horario-base-card";
    
    // Obtener nombres de grupos
    const gruposInfo = horarioBase.grupos.map(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return "";
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      return `${grado?.nombre || ""} ${grupo.nombre}`;
    }).join(", ");
    
    // Calcular bloques
    const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
      .filter(b => !b.esReceso);
    
    card.innerHTML = `
      <div class="horario-base-header">
        <h3 class="horario-base-title">${horarioBase.nombre}</h3>
        <div class="horario-base-actions">
          <button class="btn-icon" onclick="editarHorarioBase('${horarioBase.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon" onclick="confirmarEliminarHorarioBase('${horarioBase.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="horario-base-info">
        <p><i class="fas fa-clock"></i> ${horarioBase.horaInicio} - ${horarioBase.horaFin}</p>
        <p><i class="fas fa-hourglass-half"></i> ${horarioBase.duracionBloque} minutos por bloque</p>
        <p><i class="fas fa-calendar-day"></i> ${horarioBase.dias.join(", ")}</p>
        <p><i class="fas fa-users"></i> ${gruposInfo}</p>
        <p><i class="fas fa-coffee"></i> ${horarioBase.recesos.length} recesos configurados</p>
      </div>
      
      <div class="horario-base-footer">
        <div class="horario-base-stats">
          <div class="horario-base-stat">
            <div class="horario-base-stat-value">${bloques.length}</div>
            <div class="horario-base-stat-label">Bloques</div>
          </div>
          <div class="horario-base-stat">
            <div class="horario-base-stat-value">${horarioBase.grupos.length}</div>
            <div class="horario-base-stat-label">Grupos</div>
          </div>
        </div>
        
        <div class="horario-base-buttons">
          <button class="btn btn-info" onclick="iniciarGeneracionManual('${horarioBase.id}')">
            <i class="fas fa-pencil-alt"></i> Manual
          </button>
          <button class="btn btn-warning" onclick="iniciarGeneracionAutomatica('${horarioBase.id}')">
            <i class="fas fa-magic"></i> Automática
          </button>
        </div>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// =========================================
// HORARIOS
// =========================================

function calcularBloques(horaInicio, horaFin, duracionBloque, recesos = []) {
  const bloques = [];
  const inicioMinutos = convertirHoraAMinutos(horaInicio);
  const finMinutos = convertirHoraAMinutos(horaFin);
  
  let tiempoActual = inicioMinutos;
  
  while (tiempoActual < finMinutos) {
    const finBloque = tiempoActual + duracionBloque;
    
    if (finBloque > finMinutos) break;
    
    const horaInicioBloque = convertirMinutosAHora(tiempoActual);
    const horaFinBloque = convertirMinutosAHora(finBloque);
    
    // Verificar si este bloque coincide con un receso
    const esReceso = recesos.some(receso => {
      const recesoInicio = convertirHoraAMinutos(receso.horaInicio);
      const recesoFin = convertirHoraAMinutos(receso.horaFin);
      return tiempoActual >= recesoInicio && finBloque <= recesoFin;
    });
    
    if (esReceso) {
      const receso = recesos.find(r => {
        const recesoInicio = convertirHoraAMinutos(r.horaInicio);
        const recesoFin = convertirHoraAMinutos(r.horaFin);
        return tiempoActual >= recesoInicio && finBloque <= recesoFin;
      });
      
      bloques.push({
        inicio: horaInicioBloque,
        fin: horaFinBloque,
        esReceso: true,
        nombre: receso?.nombre || "Receso"
      });
    } else {
      bloques.push({
        inicio: horaInicioBloque,
        fin: horaFinBloque,
        esReceso: false
      });
    }
    
    tiempoActual = finBloque;
  }
  
  return bloques;
}

// =========================================
// GENERACIÓN MANUAL DE HORARIOS
// =========================================

function cargarSelectorHorarioBaseManual() {
  const selectorContainer = document.getElementById("selector-horario-base-manual");
  const horarioBaseSelect = document.getElementById("horario-base-manual");
  
  horarioBaseSelect.innerHTML = '<option value="">Seleccionar horario base</option>';
  
  datos.horariosBase.forEach(horarioBase => {
    horarioBaseSelect.innerHTML += `<option value="${horarioBase.id}">${horarioBase.nombre}</option>`;
  });
  
  // Ocultar constructor de horario
  document.getElementById("manual-schedule-builder").style.display = "none";
  
  // Mostrar selector
  selectorContainer.style.display = "block";
}

function seleccionarHorarioBaseManual() {
  const horarioBaseId = document.getElementById("horario-base-manual").value;
  
  if (!horarioBaseId) {
    notificarAdvertencia("Debe seleccionar un horario base");
    return;
  }
  
  // Verificar si hay asignaciones completas
  const gruposIncompletos = verificarAsignacionesCompletas();
  if (gruposIncompletos.length > 0) {
    document.getElementById("generacion-manual-alert").style.display = "block";
    return;
  }
  
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Ocultar selector
  document.getElementById("selector-horario-base-manual").style.display = "none";
  
  // Mostrar constructor de horario
  document.getElementById("manual-schedule-builder").style.display = "block";
  
  // Cargar grupos del horario base
  const grupoSelect = document.getElementById("grupo-manual");
  grupoSelect.innerHTML = '<option value="">Seleccionar grupo</option>';
  
  horarioBase.grupos.forEach(grupoId => {
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    grupoSelect.innerHTML += `<option value="${grupo.id}">${grado?.nombre || ""} ${grupo.nombre}</option>`;
  });
  
  // Guardar horario base seleccionado
  document.getElementById("manual-schedule-builder").setAttribute("data-horario-base", horarioBaseId);
  
  // Inicializar grilla de horario vacía
  inicializarGrillaHorario(horarioBase);
  
  // Inicializar asignaciones pendientes vacías
  document.getElementById("asignaciones-pendientes").innerHTML = '<p class="empty-state">Seleccione un grupo para ver las asignaciones pendientes</p>';
  
  // Ocultar panel de conflictos
  document.getElementById("conflicts-panel").style.display = "none";
}

function seleccionarGrupoManual() {
  const grupoId = document.getElementById("grupo-manual").value;
  
  if (!grupoId) {
    document.getElementById("asignaciones-pendientes").innerHTML = '<p class="empty-state">Seleccione un grupo para ver las asignaciones pendientes</p>';
    return;
  }
  
  const grupo = datos.grupos.find(g => g.id === grupoId);
  if (!grupo) return;
  
  // Guardar el horario actual antes de cambiar de grupo
  guardarHorarioTemporal();
  
  // Cargar asignaciones pendientes
  cargarAsignacionesPendientes(grupoId);
  
  // Cargar horario existente si ya se ha trabajado en él
  cargarHorarioGrupoManual(grupoId);
}

function inicializarGrillaHorario(horarioBase) {
  const gridContainer = document.getElementById("schedule-grid-container");
  
  // Crear tabla
  const grid = document.createElement("div");
  grid.className = "schedule-grid";
  
  // Calcular bloques de tiempo
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos);
  
  // Crear encabezado
  const headerRow = document.createElement("div");
  headerRow.className = "schedule-row";
  
  const headerCell = document.createElement("div");
  headerCell.className = "schedule-cell schedule-header";
  headerCell.textContent = "Hora";
  headerRow.appendChild(headerCell);
  
  horarioBase.dias.forEach(dia => {
    const diaCell = document.createElement("div");
    diaCell.className = "schedule-cell schedule-header";
    diaCell.textContent = dia;
    headerRow.appendChild(diaCell);
  });
  
  grid.appendChild(headerRow);
  
  // Crear filas para cada bloque
  bloques.forEach(bloque => {
    const row = document.createElement("div");
    row.className = "schedule-row";
    
    // Celda de hora
    const timeCell = document.createElement("div");
    timeCell.className = "schedule-cell schedule-time";
    timeCell.textContent = `${bloque.inicio} - ${bloque.fin}`;
    row.appendChild(timeCell);
    
    // Celdas para cada día
    horarioBase.dias.forEach(dia => {
      const cell = document.createElement("div");
      
      if (bloque.esReceso) {
        cell.className = "schedule-cell receso";
        cell.textContent = bloque.nombre || "Receso";
      } else {
        cell.className = "schedule-cell droppable";
        cell.setAttribute("data-dia", dia);
        cell.setAttribute("data-hora-inicio", bloque.inicio);
        cell.setAttribute("data-hora-fin", bloque.fin);
        
        // Hacer la celda receptora de arrastrar y soltar
        cell.addEventListener("dragover", permitirDrop);
        cell.addEventListener("drop", dropAsignacion);
        cell.addEventListener("dragenter", function() {
          this.classList.add("dragover");
        });
        cell.addEventListener("dragleave", function() {
          this.classList.remove("dragover");
        });
      }
      
      row.appendChild(cell);
    });
    
    grid.appendChild(row);
  });
  
  // Limpiar y agregar la grilla
  gridContainer.innerHTML = "";
  gridContainer.appendChild(grid);
}

function cargarAsignacionesPendientes(grupoId) {
  const asignacionesContainer = document.getElementById("asignaciones-pendientes");
  
  // Obtener asignaciones para este grupo
  const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupoId);
  
  if (asignacionesGrupo.length === 0) {
    asignacionesContainer.innerHTML = '<p class="empty-state">No hay asignaciones para este grupo</p>';
    return;
  }
  
  // Agrupar asignaciones por asignatura
  const asignacionesPorAsignatura = {};
  
  asignacionesGrupo.forEach(asignacion => {
    const asignatura = datos.asignaturas.find(a => a.id === asignacion.asignatura);
    if (!asignatura) return;
    
    const docente = datos.docentes.find(d => d.id === asignacion.docente);
    if (!docente) return;
    
    if (!asignacionesPorAsignatura[asignatura.id]) {
      asignacionesPorAsignatura[asignatura.id] = {
        asignatura: asignatura,
        asignaciones: []
      };
    }
    
    asignacionesPorAsignatura[asignatura.id].asignaciones.push({
      asignacion: asignacion,
      docente: docente
    });
  });
  
  // Crear elementos para cada asignatura
  asignacionesContainer.innerHTML = "";
  
  Object.values(asignacionesPorAsignatura).forEach(item => {
    const asignaturaDiv = document.createElement("div");
    asignaturaDiv.className = "asignatura-pendiente";
    
    const area = datos.areas.find(a => a.id === item.asignatura.area);
    const color = area ? area.color : "#cccccc";
    
    asignaturaDiv.innerHTML = `<h4>${item.asignatura.nombre}</h4>`;
    
    item.asignaciones.forEach(a => {
      // Calcular horas pendientes
      const horasTotales = a.asignacion.horasSemanales;
      const horasAsignadas = contarHorasAsignadasEnHorario(grupoId, a.asignacion.id);
      const horasPendientes = horasTotales - horasAsignadas;
      
      if (horasPendientes > 0) {
        const asignacionItem = document.createElement("div");
        asignacionItem.className = "asignacion-item";
        asignacionItem.setAttribute("draggable", "true");
        asignacionItem.setAttribute("data-asignacion-id", a.asignacion.id);
        asignacionItem.setAttribute("data-asignatura-id", item.asignatura.id);
        asignacionItem.setAttribute("data-docente-id", a.docente.id);
        asignacionItem.setAttribute("data-grupo-id", grupoId);
        asignacionItem.setAttribute("data-horas-pendientes", horasPendientes);
        asignacionItem.setAttribute("data-bloque-maximo", a.asignacion.bloqueMaximo);
        asignacionItem.style.borderLeft = `4px solid ${color}`;
        
        asignacionItem.innerHTML = `
          <div class="asignacion-item-header">${item.asignatura.nombre}</div>
          <div class="asignacion-item-info">
            <div>Docente: ${a.docente.nombre}</div>
            <div>Horas pendientes: ${horasPendientes} de ${horasTotales}</div>
          </div>
        `;
        
        // Agregar eventos de arrastrar
        asignacionItem.addEventListener("dragstart", dragAsignacion);
        
        asignaturaDiv.appendChild(asignacionItem);
      }
    });
    
    asignacionesContainer.appendChild(asignaturaDiv);
  });
}

function cargarHorarioGrupoManual(grupoId) {
  // Limpiar celdas que no son recesos
  document.querySelectorAll(".schedule-cell.droppable").forEach(cell => {
    if (!cell.classList.contains("receso")) {
      cell.innerHTML = "";
      cell.classList.remove("occupied");
      cell.classList.remove("conflict");
      
      // Eliminar atributos de datos
      cell.removeAttribute("data-asignacion-id");
      cell.removeAttribute("data-asignatura-id");
      cell.removeAttribute("data-docente-id");
      cell.removeAttribute("data-grupo-id");
    }
  });
  
  // Cargar horario temporal si existe
  const horarioTemp = localStorage.getItem(`horarioTemp_${grupoId}`);
  if (horarioTemp) {
    const asignaciones = JSON.parse(horarioTemp);
    
    asignaciones.forEach(asignacion => {
      // Encontrar la celda correspondiente
      const celda = document.querySelector(`.schedule-cell[data-dia="${asignacion.dia}"][data-hora-inicio="${asignacion.horaInicio}"][data-hora-fin="${asignacion.horaFin}"]`);
      
      if (celda) {
        // Restaurar la celda
        celda.innerHTML = asignacion.html;
        celda.classList.add("occupied");
        
        // Restaurar atributos
        celda.setAttribute("data-asignacion-id", asignacion.asignacionId);
        celda.setAttribute("data-asignatura-id", asignacion.asignaturaId);
        celda.setAttribute("data-docente-id", asignacion.docenteId);
        celda.setAttribute("data-grupo-id", asignacion.grupoId);
      }
    });
  }
  
  // Guardar el grupo actual
  document.getElementById("grupo-manual").setAttribute("data-grupo-actual", grupoId);
  
  // Ocultar panel de conflictos
  document.getElementById("conflicts-panel").style.display = "none";
  document.getElementById("conflicts-list").innerHTML = "";
}

function dragAsignacion(event) {
  const asignacionItem = event.target;
  
  // Guardar datos de la asignación en el evento de arrastrar
  event.dataTransfer.setData("asignacionId", asignacionItem.getAttribute("data-asignacion-id"));
  event.dataTransfer.setData("asignaturaId", asignacionItem.getAttribute("data-asignatura-id"));
  event.dataTransfer.setData("docenteId", asignacionItem.getAttribute("data-docente-id"));
  event.dataTransfer.setData("grupoId", asignacionItem.getAttribute("data-grupo-id"));
  event.dataTransfer.setData("horasPendientes", asignacionItem.getAttribute("data-horas-pendientes"));
  event.dataTransfer.setData("bloqueMaximo", asignacionItem.getAttribute("data-bloque-maximo"));
}

function permitirDrop(event) {
  event.preventDefault();
}

function dropAsignacion(event) {
  event.preventDefault();
  
  const cell = event.target;
  
  // Si la celda ya está ocupada, no permitir el drop
  if (cell.classList.contains("occupied")) {
    mostrarConflictoManual("celda-ocupada", {
      dia: cell.getAttribute("data-dia"),
      horaInicio: cell.getAttribute("data-hora-inicio"),
      horaFin: cell.getAttribute("data-hora-fin")
    });
    return;
  }
  
  // Obtener datos de la asignación
  const asignacionId = event.dataTransfer.getData("asignacionId");
  const asignaturaId = event.dataTransfer.getData("asignaturaId");
  const docenteId = event.dataTransfer.getData("docenteId");
  const grupoId = event.dataTransfer.getData("grupoId");
  const bloqueMaximo = parseInt(event.dataTransfer.getData("bloqueMaximo"));
  
  // Obtener datos de la celda
  const dia = cell.getAttribute("data-dia");
  const horaInicio = cell.getAttribute("data-hora-inicio");
  const horaFin = cell.getAttribute("data-hora-fin");
  
  // Verificar conflictos
  if (!validarAsignacionManual(docenteId, asignaturaId, dia, horaInicio, horaFin)) {
    return;
  }
  
  // Obtener datos de la asignatura y docente
  const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!asignatura || !docente) return;
  
  // Obtener color del área
  const area = datos.areas.find(a => a.id === asignatura.area);
  const color = area ? area.color : "#cccccc";
  
  // Crear contenido de la celda
  cell.innerHTML = `
    <div class="class-content" style="background-color: ${color}20; border-left: 4px solid ${color}">
      <div class="class-subject">${asignatura.nombre}</div>
      <div class="class-teacher">${docente.nombre}</div>
      <button class="delete-assignment" onclick="eliminarAsignacionCelda(this)"><i class="fas fa-times"></i></button>
    </div>
  `;
  
  // Marcar la celda como ocupada
  cell.classList.add("occupied");
  cell.classList.remove("dragover");
  
  // Guardar datos de la asignación en la celda
  cell.setAttribute("data-asignacion-id", asignacionId);
  cell.setAttribute("data-asignatura-id", asignaturaId);
  cell.setAttribute("data-docente-id", docenteId);
  cell.setAttribute("data-grupo-id", grupoId);
  
  // Actualizar asignaciones pendientes
  actualizarAsignacionesPendientes(grupoId);
  
  // Guardar el grupo actual
  document.getElementById("grupo-manual").setAttribute("data-grupo-actual", grupoId);
}

function validarAsignacionManual(docenteId, asignaturaId, dia, horaInicio, horaFin) {
  // Verificar si el docente ya tiene clase en este horario en cualquier grupo
  const docenteOcupado = verificarDocenteOcupadoEnCualquierGrupo(docenteId, dia, horaInicio, horaFin);
  if (docenteOcupado) {
    mostrarConflictoManual("docente-ocupado", {
      docente: datos.docentes.find(d => d.id === docenteId),
      dia,
      horaInicio,
      horaFin
    });
    return false;
  }
  
  // Verificar si el docente tiene restricción en este horario
  const tieneRestriccion = verificarRestriccionDocente(docenteId, dia, horaInicio, horaFin);
  if (tieneRestriccion) {
    mostrarConflictoManual("restriccion-docente", {
      docente: datos.docentes.find(d => d.id === docenteId),
      dia,
      horaInicio,
      horaFin
    });
    return false;
  }
  
  // Verificar si la asignatura ya tiene demasiadas horas en este día
  const horasAsignaturaEnDia = contarHorasAsignaturaEnDia(asignaturaId, dia);
  if (horasAsignaturaEnDia >= 3) {
    mostrarConflictoManual("max-horas-dia", {
      asignatura: datos.asignaturas.find(a => a.id === asignaturaId),
      dia,
      horasActuales: horasAsignaturaEnDia
    });
    return false;
  }
  
  return true;
}

function eliminarAsignacionCelda(button) {
  const cell = button.closest(".schedule-cell");
  const grupoId = cell.getAttribute("data-grupo-id");
  
  // Limpiar la celda
  cell.innerHTML = "";
  cell.classList.remove("occupied");
  cell.classList.remove("conflict");
  
  // Eliminar atributos de datos
  cell.removeAttribute("data-asignacion-id");
  cell.removeAttribute("data-asignatura-id");
  cell.removeAttribute("data-docente-id");
  cell.removeAttribute("data-grupo-id");
  
  // Actualizar asignaciones pendientes
  if (grupoId) {
    actualizarAsignacionesPendientes(grupoId);
  }
}

function actualizarAsignacionesPendientes(grupoId) {
  // Recargar las asignaciones pendientes
  cargarAsignacionesPendientes(grupoId);
}

function contarHorasAsignadasEnHorario(grupoId, asignacionId) {
  // Contar cuántas horas de esta asignación ya están asignadas en el horario actual
  const celdasOcupadas = document.querySelectorAll(`.schedule-cell.occupied[data-grupo-id="${grupoId}"][data-asignacion-id="${asignacionId}"]`);
  return celdasOcupadas.length;
}

function contarHorasAsignaturaEnDia(asignaturaId, dia) {
  // Contar cuántas horas de esta asignatura ya están asignadas en este día
  const celdasOcupadas = document.querySelectorAll(`.schedule-cell.occupied[data-asignatura-id="${asignaturaId}"][data-dia="${dia}"]`);
  return celdasOcupadas.length;
}

function verificarDocenteOcupadoEnCualquierGrupo(docenteId, dia, horaInicio, horaFin) {
  // Verificar en todas las celdas ocupadas si el docente ya tiene clase en este horario
  const celdasOcupadas = document.querySelectorAll(".schedule-cell.occupied");
  
  for (let i = 0; i < celdasOcupadas.length; i++) {
    const celda = celdasOcupadas[i];
    
    if (
      celda.getAttribute("data-docente-id") === docenteId &&
      celda.getAttribute("data-dia") === dia &&
      celda.getAttribute("data-hora-inicio") === horaInicio &&
      celda.getAttribute("data-hora-fin") === horaFin
    ) {
      return true;
    }
  }
  
  return false;
}

function verificarRestriccionDocente(docenteId, dia, horaInicio, horaFin) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return false;
  
  return docente.restricciones.some(r => {
    if (r.dia !== dia) return false;
    
    // Convertir horas a minutos para comparar
    const restriccionInicio = convertirHoraAMinutos(r.horaInicio);
    const restriccionFin = convertirHoraAMinutos(r.horaFin);
    const claseInicio = convertirHoraAMinutos(horaInicio);
    const claseFin = convertirHoraAMinutos(horaFin);
    
    // Verificar si hay solapamiento
    return (
      (claseInicio >= restriccionInicio && claseInicio < restriccionFin) ||
      (claseFin > restriccionInicio && claseFin <= restriccionFin) ||
      (claseInicio <= restriccionInicio && claseFin >= restriccionFin)
    );
  });
}

function guardarHorarioTemporal() {
  const grupoActual = document.getElementById("grupo-manual").getAttribute("data-grupo-actual");
  if (!grupoActual) return;
  
  // Crear un array para almacenar las asignaciones actuales
  const asignacionesActuales = [];
  
  // Obtener todas las celdas ocupadas para el grupo actual
  document.querySelectorAll(`.schedule-cell.occupied[data-grupo-id="${grupoActual}"]`).forEach(celda => {
    asignacionesActuales.push({
      dia: celda.getAttribute("data-dia"),
      horaInicio: celda.getAttribute("data-hora-inicio"),
      horaFin: celda.getAttribute("data-hora-fin"),
      asignacionId: celda.getAttribute("data-asignacion-id"),
      asignaturaId: celda.getAttribute("data-asignatura-id"),
      docenteId: celda.getAttribute("data-docente-id"),
      grupoId: celda.getAttribute("data-grupo-id"),
      html: celda.innerHTML
    });
  });
  
  // Guardar en localStorage
  localStorage.setItem(`horarioTemp_${grupoActual}`, JSON.stringify(asignacionesActuales));
}

function mostrarConflictoManual(tipo, datos) {
  // Mostrar panel de conflictos
  const conflictsPanel = document.getElementById("conflicts-panel");
  const conflictsList = document.getElementById("conflicts-list");
  
  // Crear elemento de conflicto
  const conflictItem = document.createElement("div");
  conflictItem.className = "conflict-item";
  
  let titulo = "";
  let descripcion = "";
  
  switch (tipo) {
    case "celda-ocupada":
      titulo = "Celda Ocupada";
      descripcion = `Esta celda ya está ocupada. Elimine la asignación existente primero.`;
      break;
    case "docente-ocupado":
      titulo = "Conflicto de Horario de Docente";
      descripcion = `El docente ${datos.docente.nombre} ya tiene una clase asignada el día ${datos.dia} de ${datos.horaInicio} a ${datos.horaFin}.`;
      break;
    case "restriccion-docente":
      titulo = "Restricción de Horario de Docente";
      descripcion = `El docente ${datos.docente.nombre} tiene una restricción de horario el día ${datos.dia} que incluye el período de ${datos.horaInicio} a ${datos.horaFin}.`;
      break;
    case "max-horas-dia":
      titulo = "Máximo de Horas por Día Excedido";
      descripcion = `La asignatura ${datos.asignatura.nombre} ya tiene ${datos.horasActuales} horas asignadas el día ${datos.dia}. No se pueden asignar más de 3 horas de una misma asignatura en un día.`;
      break;
  }
  
  conflictItem.innerHTML = `
    <h5>${titulo}</h5>
    <p>${descripcion}</p>
  `;
  
  // Limpiar conflictos anteriores y agregar el nuevo
  conflictsList.innerHTML = "";
  conflictsList.appendChild(conflictItem);
  conflictsPanel.style.display = "block";
}

function iniciarGeneracionManual(horarioBaseId) {
  // Verificar si hay asignaciones completas
  const gruposIncompletos = verificarAsignacionesCompletas();
  if (gruposIncompletos.length > 0) {
    document.getElementById("generacion-manual-alert").style.display = "block";
    showSection("generacion-manual");
    return;
  }
  
  // Navegar a la sección de generación manual
  showSection("generacion-manual");
  
  // Seleccionar el horario base
  const horarioBaseSelect = document.getElementById("horario-base-manual");
  horarioBaseSelect.value = horarioBaseId;
  
  // Iniciar la generación
  seleccionarHorarioBaseManual();
}

function cancelarGeneracionManual() {
  // Mostrar selector de horario base
  document.getElementById("selector-horario-base-manual").style.display = "block";
  
  // Ocultar constructor de horario
  document.getElementById("manual-schedule-builder").style.display = "none";
  
  // Limpiar selector de grupo
  document.getElementById("grupo-manual").innerHTML = '<option value="">Seleccionar grupo</option>';
  document.getElementById("grupo-manual").removeAttribute("data-grupo-actual");
  
  // Limpiar asignaciones pendientes
  document.getElementById("asignaciones-pendientes").innerHTML = '<p class="empty-state">Seleccione un grupo para ver las asignaciones pendientes</p>';
  
  // Limpiar grilla de horario
  document.getElementById("schedule-grid-container").innerHTML = "";
  
  // Restablecer el selector de horario base
  document.getElementById("horario-base-manual").value = "";
  
  // Eliminar atributo de horario base
  document.getElementById("manual-schedule-builder").removeAttribute("data-horario-base");
  
  // Ocultar panel de conflictos
  document.getElementById("conflicts-panel").style.display = "none";
  document.getElementById("conflicts-list").innerHTML = "";
  
  // Limpiar horarios temporales
  limpiarHorariosTemporales();
  
  // Navegar a la sección de horarios base
  showSection("horarios-base");
}

function limpiarHorariosTemporales() {
  // Limpiar todos los horarios temporales del localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('horarioTemp_')) {
      localStorage.removeItem(key);
    }
  });
}

function guardarHorariosManual() {
  const horarioBaseId = document.getElementById("manual-schedule-builder").getAttribute("data-horario-base");
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Verificar si hay al menos una asignación
  const celdasOcupadas = document.querySelectorAll(".schedule-cell.occupied");
  if (celdasOcupadas.length === 0) {
    notificarAdvertencia("No hay asignaciones para guardar");
    return;
  }
  
  // Crear horarios para cada grupo
  const horarios = [];
  
  // Verificar si hay espacios vacíos en los horarios
  let hayEspaciosVacios = false;
  
  horarioBase.grupos.forEach(grupoId => {
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (!grupo) return;
    
    // Crear horario para este grupo
    const horario = {
      id: generateId(),
      grupo: grupoId,
      clases: []
    };
    
    // Buscar celdas ocupadas para este grupo
    document.querySelectorAll(`.schedule-cell.occupied[data-grupo-id="${grupoId}"]`).forEach(celda => {
      const asignacionId = celda.getAttribute("data-asignacion-id");
      const asignaturaId = celda.getAttribute("data-asignatura-id");
      const docenteId = celda.getAttribute("data-docente-id");
      const dia = celda.getAttribute("data-dia");
      const horaInicio = celda.getAttribute("data-hora-inicio");
      const horaFin = celda.getAttribute("data-hora-fin");
      
      horario.clases.push({
        asignacion: asignacionId,
        asignatura: asignaturaId,
        docente: docenteId,
        dia,
        horaInicio,
        horaFin
      });
    });
    
    // Verificar si hay espacios vacíos en el horario
    const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
      .filter(b => !b.esReceso);
    
    horarioBase.dias.forEach(dia => {
      bloques.forEach(bloque => {
        // Verificar si hay una clase asignada para este día y bloque
        const hayClase = horario.clases.some(c => 
          c.dia === dia && 
          c.horaInicio === bloque.inicio && 
          c.horaFin === bloque.fin
        );
        
        if (!hayClase) {
          hayEspaciosVacios = true;
        }
      });
    });
    
    // Solo agregar el horario si tiene clases
    if (horario.clases.length > 0) {
      horarios.push(horario);
    }
  });
  
  // Verificar si hay horarios para guardar
  if (horarios.length === 0) {
    alert("No hay horarios para guardar");
    return;
  }
  
  // Si hay espacios vacíos, mostrar advertencia
  if (hayEspaciosVacios) {
    document.getElementById("modal-espacios-vacios").style.display = "block";
    return;
  }
  
  // Guardar horarios
  finalizarGuardadoManual(horarioBase, horarios);
}

function continuarConEspaciosVacios() {
  cerrarModal("modal-espacios-vacios");
  
  // Obtener horario base
  const horarioBaseId = document.getElementById("manual-schedule-builder").getAttribute("data-horario-base");
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Crear horarios para cada grupo
  const horarios = [];
  
  horarioBase.grupos.forEach(grupoId => {
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (!grupo) return;
    
    // Crear horario para este grupo
    const horario = {
      id: generateId(),
      grupo: grupoId,
      clases: []
    };
    
    // Buscar celdas ocupadas para este grupo
    document.querySelectorAll(`.schedule-cell.occupied[data-grupo-id="${grupoId}"]`).forEach(celda => {
      const asignacionId = celda.getAttribute("data-asignacion-id");
      const asignaturaId = celda.getAttribute("data-asignatura-id");
      const docenteId = celda.getAttribute("data-docente-id");
      const dia = celda.getAttribute("data-dia");
      const horaInicio = celda.getAttribute("data-hora-inicio");
      const horaFin = celda.getAttribute("data-hora-fin");
      
      horario.clases.push({
        asignacion: asignacionId,
        asignatura: asignaturaId,
        docente: docenteId,
        dia,
        horaInicio,
        horaFin
      });
    });
    
    // Solo agregar el horario si tiene clases
    if (horario.clases.length > 0) {
      horarios.push(horario);
    }
  });
  
  // Guardar horarios
  finalizarGuardadoManual(horarioBase, horarios);
}

function finalizarGuardadoManual(horarioBase, horarios) {
  // Crear entrada en el historial
  const nuevaGeneracion = {
    id: generateId(),
    nombre: `Generación Manual - ${horarioBase.nombre}`,
    tipo: "manual",
    fecha: new Date().toISOString(),
    horarioBase: horarioBase,
    horarios: horarios
  };
  
  // Agregar al historial
  datos.historial.push(nuevaGeneracion);
  
  // Guardar datos
  guardarDatos();
  
  // Limpiar horarios temporales
  limpiarHorariosTemporales();
  
  // Mostrar mensaje de éxito
  notificarExito("Horarios guardados correctamente");
  
  // Navegar a la sección de historial
  showSection("historial");
}

// =========================================
// GENERACIÓN AUTOMÁTICA DE HORARIOS
// =========================================

function cargarSelectorHorarioBaseAuto() {
  const selectorContainer = document.getElementById("selector-horario-base-auto");
  const horarioBaseSelect = document.getElementById("horario-base-auto");
  
  horarioBaseSelect.innerHTML = '<option value="">Seleccionar horario base</option>';
  
  datos.horariosBase.forEach(horarioBase => {
    horarioBaseSelect.innerHTML += `<option value="${horarioBase.id}">${horarioBase.nombre}</option>`;
  });
  
  // Ocultar configuración y resultados
  document.getElementById("configuracion-auto").style.display = "none";
  document.getElementById("resultados-auto").style.display = "none";
  
  // Mostrar selector
  selectorContainer.style.display = "block";
}

function seleccionarHorarioBaseAuto() {
  const horarioBaseId = document.getElementById("horario-base-auto").value;
  
  if (!horarioBaseId) {
    alert("Debe seleccionar un horario base");
    return;
  }
  
  // Verificar si hay asignaciones completas
  const gruposIncompletos = verificarAsignacionesCompletas();
  if (gruposIncompletos.length > 0) {
    document.getElementById("generacion-auto-alert").style.display = "block";
    return;
  }
  
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Ocultar selector
  document.getElementById("selector-horario-base-auto").style.display = "none";
  
  // Mostrar configuración
  document.getElementById("configuracion-auto").style.display = "block";
  
  // Ocultar resultados
  document.getElementById("resultados-auto").style.display = "none";
  
  // Guardar horario base seleccionado
  document.getElementById("configuracion-auto").setAttribute("data-horario-base", horarioBaseId);
  
  // Cargar opciones de configuración
  cargarOpcionesConfiguracion(horarioBase);
}

function cargarOpcionesConfiguracion(horarioBase) {
  // Cargar opciones de configuración
  document.getElementById("max-intentos").value = "1000";
  document.getElementById("prioridad-directores").checked = true;
  document.getElementById("distribuir-asignaturas").checked = true;
  
  // Cargar algoritmos de generación
  const algoritmoSelect = document.getElementById("algoritmo-generacion");
  if (algoritmoSelect) {
    algoritmoSelect.innerHTML = `
      <option value="greedy">Algoritmo Voraz (Rápido)</option>
      <option value="backtracking">Backtracking (Preciso)</option>
      <option value="genetic">Algoritmo Genético (Optimizado)</option>
    `;
    algoritmoSelect.value = "greedy"; // Por defecto
  }
  
  // Inicializar selector de tipo de generación
  const tipoGeneracionSelect = document.getElementById("tipo-generacion");
  if (tipoGeneracionSelect) {
    tipoGeneracionSelect.value = "grupo";
    seleccionarTipoGeneracion();
  }
}

function seleccionarTipoGeneracion() {
  const tipoGeneracion = document.getElementById("tipo-generacion").value;
  const selectorContainer = document.getElementById("selector-grupos-grados");
  
  if (!tipoGeneracion) {
    selectorContainer.innerHTML = "";
    return;
  }
  
  const horarioBaseId = document.getElementById("configuracion-auto").getAttribute("data-horario-base");
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  selectorContainer.innerHTML = `<label>${tipoGeneracion === "grupo" ? "Grupos" : "Grados"}:</label>`;
  
  if (tipoGeneracion === "grupo") {
    // Mostrar selector de grupos
    const gruposContainer = document.createElement("div");
    gruposContainer.className = "checkbox-group";
    
    horarioBase.grupos.forEach(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      
      const checkboxItem = document.createElement("div");
      checkboxItem.className = "checkbox-item";
      checkboxItem.innerHTML = `
        <input type="checkbox" id="auto-grupo-${grupo.id}" class="grupo-checkbox" value="${grupo.id}" checked>
        <label for="auto-grupo-${grupo.id}">${grado?.nombre || ""} ${grupo.nombre}</label>
      `;
      
      gruposContainer.appendChild(checkboxItem);
    });
    
    selectorContainer.appendChild(gruposContainer);
  } else if (tipoGeneracion === "grado") {
    // Mostrar selector de grados
    const gradosContainer = document.createElement("div");
    gradosContainer.className = "checkbox-group";
    
    // Obtener grados únicos de los grupos del horario base
    const gradosIds = [...new Set(horarioBase.grupos.map(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      return grupo ? grupo.grado : null;
    }).filter(Boolean))];
    
    gradosIds.forEach(gradoId => {
      const grado = datos.grados.find(g => g.id === gradoId);
      if (!grado) return;
      
      const checkboxItem = document.createElement("div");
      checkboxItem.className = "checkbox-item";
      checkboxItem.innerHTML = `
        <input type="checkbox" id="auto-grado-${grado.id}" class="grado-checkbox" value="${grado.id}" checked>
        <label for="auto-grado-${grado.id}">${grado.nombre}</label>
      `;
      
      gradosContainer.appendChild(checkboxItem);
    });
    
    selectorContainer.appendChild(gradosContainer);
  }
}

// Algoritmos de generación
function generarHorariosAutomaticos(horarioBase, gruposSeleccionados, opciones) {
  const algoritmo = opciones.algoritmo || 'greedy';
  
  switch (algoritmo) {
    case 'greedy':
      return generarHorariosGreedy(horarioBase, gruposSeleccionados, opciones);
    case 'backtracking':
      return generarHorariosBacktracking(horarioBase, gruposSeleccionados, opciones);
    case 'genetic':
      return generarHorariosGenetico(horarioBase, gruposSeleccionados, opciones);
    default:
      return generarHorariosGreedy(horarioBase, gruposSeleccionados, opciones);
  }
}

function generarHorariosGreedy(horarioBase, gruposSeleccionados, opciones) {
  // Algoritmo voraz - rápido pero no siempre óptimo
  const horarios = [];
  const asignacionesPendientes = [];
  const conflictos = [];
  
  // Calcular bloques de tiempo disponibles
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
    .filter(b => !b.esReceso);
  
  // Matriz para rastrear docentes ocupados
  const docentesOcupados = {};
  horarioBase.dias.forEach(dia => {
    docentesOcupados[dia] = {};
    bloques.forEach(bloque => {
      docentesOcupados[dia][`${bloque.inicio}-${bloque.fin}`] = [];
    });
  });
  
  // Procesar cada grupo
  gruposSeleccionados.forEach(grupoId => {
    const grupo = datos.grupos.find(g => g.id === grupoId);
    if (!grupo) return;
    
    const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupoId);
    const horario = {
      id: generateId(),
      grupo: grupoId,
      clases: []
    };
    
    // Ordenar asignaciones por prioridad (más horas primero)
    const asignacionesOrdenadas = [...asignacionesGrupo].sort((a, b) => {
      // Prioridad a directores de grupo si está activado
      if (opciones.prioridadDirectores) {
        const docenteA = datos.docentes.find(d => d.id === a.docente);
        const docenteB = datos.docentes.find(d => d.id === b.docente);
        
        if (docenteA?.directorGrupo === grupoId && docenteB?.directorGrupo !== grupoId) return -1;
        if (docenteB?.directorGrupo === grupoId && docenteA?.directorGrupo !== grupoId) return 1;
      }
      
      return b.horasSemanales - a.horasSemanales;
    });
    
    // Asignar clases usando algoritmo voraz
    asignacionesOrdenadas.forEach(asignacion => {
      const docente = datos.docentes.find(d => d.id === asignacion.docente);
      if (!docente) return;
      
      let horasPendientes = asignacion.horasSemanales;
      const horasPorDia = {};
      
      horarioBase.dias.forEach(dia => {
        horasPorDia[dia] = 0;
      });
      
      // Distribuir horas de manera voraz
      while (horasPendientes > 0) {
        let asignado = false;
        
        // Buscar el mejor slot disponible
        for (const dia of horarioBase.dias) {
          if (horasPorDia[dia] >= 3) continue; // Máximo 3 horas por día
          
          for (const bloque of bloques) {
            const horarioKey = `${bloque.inicio}-${bloque.fin}`;
            
            // Verificar disponibilidad
            if (docentesOcupados[dia][horarioKey].includes(docente.id)) continue;
            if (verificarRestriccionDocente(docente.id, dia, bloque.inicio, bloque.fin)) continue;
            
            // Asignar clase
            const nuevaClase = {
              asignacion: asignacion.id,
              asignatura: asignacion.asignatura,
              docente: asignacion.docente,
              dia,
              horaInicio: bloque.inicio,
              horaFin: bloque.fin
            };
            
            horario.clases.push(nuevaClase);
            docentesOcupados[dia][horarioKey].push(docente.id);
            horasPorDia[dia]++;
            horasPendientes--;
            asignado = true;
            break;
          }
          
          if (asignado) break;
        }
        
        if (!asignado) {
          // No se pudo asignar, agregar a pendientes
          const asignatura = datos.asignaturas.find(a => a.id === asignacion.asignatura);
          const grado = datos.grados.find(g => g.id === grupo.grado);
          
          asignacionesPendientes.push({
            asignatura: asignatura?.nombre || "Desconocida",
            docente: docente.nombre,
            grupo: `${grado?.nombre || ""} ${grupo.nombre}`,
            horasTotales: asignacion.horasSemanales,
            horasPendientes
          });
          break;
        }
      }
    });
    
    if (horario.clases.length > 0) {
      horarios.push(horario);
    }
  });
  
  return {
    exito: asignacionesPendientes.length === 0 && conflictos.length === 0,
    mensaje: asignacionesPendientes.length === 0 && conflictos.length === 0 ? 
      "Horarios generados correctamente con algoritmo voraz" : 
      "La generación automática encontró algunos problemas",
    horarios,
    conflictos,
    asignacionesPendientes
  };
}

function generarHorariosBacktracking(horarioBase, gruposSeleccionados, opciones) {
  // Algoritmo de backtracking - más preciso pero más lento
  const horarios = [];
  const asignacionesPendientes = [];
  const conflictos = [];
  
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
    .filter(b => !b.esReceso);
  
  // Función recursiva de backtracking
  function backtrack(grupoIndex, asignacionIndex, solucionActual) {
    if (grupoIndex >= gruposSeleccionados.length) {
      // Solución encontrada
      return true;
    }
    
    const grupoId = gruposSeleccionados[grupoIndex];
    const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupoId);
    
    if (asignacionIndex >= asignacionesGrupo.length) {
      // Pasar al siguiente grupo
      return backtrack(grupoIndex + 1, 0, solucionActual);
    }
    
    const asignacion = asignacionesGrupo[asignacionIndex];
    const docente = datos.docentes.find(d => d.id === asignacion.docente);
    
    if (!docente) {
      return backtrack(grupoIndex, asignacionIndex + 1, solucionActual);
    }
    
    // Intentar asignar todas las horas de esta asignación
    for (let horasAsignadas = 0; horasAsignadas < asignacion.horasSemanales; horasAsignadas++) {
      let asignado = false;
      
      for (const dia of horarioBase.dias) {
        for (const bloque of bloques) {
          const slot = `${grupoId}-${dia}-${bloque.inicio}-${bloque.fin}`;
          
          // Verificar si el slot está disponible
          if (solucionActual.has(slot)) continue;
          if (verificarConflictoDocente(docente.id, dia, bloque.inicio, bloque.fin, solucionActual)) continue;
          if (verificarRestriccionDocente(docente.id, dia, bloque.inicio, bloque.fin)) continue;
          
          // Asignar temporalmente
          solucionActual.add(slot);
          solucionActual.set(`docente-${docente.id}-${dia}-${bloque.inicio}`, grupoId);
          
          asignado = true;
          break;
        }
        if (asignado) break;
      }
      
      if (!asignado) {
        // No se pudo asignar, hacer backtrack
        return false;
      }
    }
    
    // Continuar con la siguiente asignación
    return backtrack(grupoIndex, asignacionIndex + 1, solucionActual);
  }
  
  // Ejecutar backtracking
  const solucion = new Map();
  const exito = backtrack(0, 0, solucion);
  
  if (exito) {
    // Convertir solución a formato de horarios
    gruposSeleccionados.forEach(grupoId => {
      const horario = {
        id: generateId(),
        grupo: grupoId,
        clases: []
      };
      
      // Extraer clases de la solución
      for (const [key, value] of solucion.entries()) {
        if (key.startsWith(grupoId)) {
          const [, dia, horaInicio, horaFin] = key.split('-');
          const docenteKey = `docente-${value}-${dia}-${horaInicio}`;
          
          if (solucion.has(docenteKey)) {
            // Encontrar la asignación correspondiente
            const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupoId);
            const asignacion = asignacionesGrupo.find(a => a.docente === value);
            
            if (asignacion) {
              horario.clases.push({
                asignacion: asignacion.id,
                asignatura: asignacion.asignatura,
                docente: asignacion.docente,
                dia,
                horaInicio,
                horaFin
              });
            }
          }
        }
      }
      
      if (horario.clases.length > 0) {
        horarios.push(horario);
      }
    });
  }
  
  return {
    exito: exito,
    mensaje: exito ? 
      "Horarios generados correctamente con backtracking" : 
      "No se pudo encontrar una solución válida con backtracking",
    horarios,
    conflictos,
    asignacionesPendientes: exito ? [] : ["No se pudo completar la asignación con backtracking"]
  };
}

function generarHorariosGenetico(horarioBase, gruposSeleccionados, opciones) {
  // Algoritmo genético - optimizado para mejores soluciones
  const poblacionSize = 50;
  const generaciones = 100;
  const mutacionRate = 0.1;
  
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos)
    .filter(b => !b.esReceso);
  
  // Crear población inicial
  function crearIndividuo() {
    const individuo = {
      horarios: [],
      fitness: 0
    };
    
    gruposSeleccionados.forEach(grupoId => {
      const asignacionesGrupo = datos.asignaciones.filter(a => a.grupo === grupoId);
      const horario = {
        id: generateId(),
        grupo: grupoId,
        clases: []
      };
      
      asignacionesGrupo.forEach(asignacion => {
        for (let i = 0; i < asignacion.horasSemanales; i++) {
          const diaAleatorio = horarioBase.dias[Math.floor(Math.random() * horarioBase.dias.length)];
          const bloqueAleatorio = bloques[Math.floor(Math.random() * bloques.length)];
          
          horario.clases.push({
            asignacion: asignacion.id,
            asignatura: asignacion.asignatura,
            docente: asignacion.docente,
            dia: diaAleatorio,
            horaInicio: bloqueAleatorio.inicio,
            horaFin: bloqueAleatorio.fin
          });
        }
      });
      
      individuo.horarios.push(horario);
    });
    
    return individuo;
  }
  
  // Calcular fitness
  function calcularFitness(individuo) {
    let fitness = 1000; // Fitness base
    
    // Penalizar conflictos
    individuo.horarios.forEach(horario => {
      const conflictos = verificarConflictosHorario(horario);
      fitness -= conflictos.length * 50;
    });
    
    // Penalizar distribución desigual
    individuo.horarios.forEach(horario => {
      const distribucionDias = {};
      horarioBase.dias.forEach(dia => {
        distribucionDias[dia] = horario.clases.filter(c => c.dia === dia).length;
      });
      
      const valores = Object.values(distribucionDias);
      const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
      const desviacion = valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length;
      
      fitness -= desviacion * 10;
    });
    
    return Math.max(0, fitness);
  }
  
  // Crear población inicial
  let poblacion = [];
  for (let i = 0; i < poblacionSize; i++) {
    const individuo = crearIndividuo();
    individuo.fitness = calcularFitness(individuo);
    poblacion.push(individuo);
  }
  
  // Evolucionar
  for (let gen = 0; gen < generaciones; gen++) {
    // Selección
    poblacion.sort((a, b) => b.fitness - a.fitness);
    const mejores = poblacion.slice(0, poblacionSize / 2);
    
    // Cruzamiento y mutación
    const nuevaPoblacion = [...mejores];
    
    while (nuevaPoblacion.length < poblacionSize) {
      const padre1 = mejores[Math.floor(Math.random() * mejores.length)];
      const padre2 = mejores[Math.floor(Math.random() * mejores.length)];
      
      // Cruzamiento simple
      const hijo = crearIndividuo();
      
      // Mutación
      if (Math.random() < mutacionRate) {
        hijo.horarios.forEach(horario => {
          if (horario.clases.length > 0) {
            const claseAleatoria = horario.clases[Math.floor(Math.random() * horario.clases.length)];
            claseAleatoria.dia = horarioBase.dias[Math.floor(Math.random() * horarioBase.dias.length)];
            const bloqueAleatorio = bloques[Math.floor(Math.random() * bloques.length)];
            claseAleatoria.horaInicio = bloqueAleatorio.inicio;
            claseAleatoria.horaFin = bloqueAleatorio.fin;
          }
        });
      }
      
      hijo.fitness = calcularFitness(hijo);
      nuevaPoblacion.push(hijo);
    }
    
    poblacion = nuevaPoblacion;
  }
  
  // Seleccionar el mejor individuo
  poblacion.sort((a, b) => b.fitness - a.fitness);
  const mejorIndividuo = poblacion[0];
  
  return {
    exito: mejorIndividuo.fitness > 500,
    mensaje: mejorIndividuo.fitness > 500 ? 
      "Horarios optimizados con algoritmo genético" : 
      "Solución subóptima encontrada con algoritmo genético",
    horarios: mejorIndividuo.horarios,
    conflictos: [],
    asignacionesPendientes: []
  };
}

// Funciones auxiliares
function verificarConflictoDocente(docenteId, dia, horaInicio, horaFin, solucion) {
  const key = `docente-${docenteId}-${dia}-${horaInicio}`;
  return solucion.has(key);
}

// Ejecución de generación
function iniciarGeneracionAuto() {
  const horarioBaseId = document.getElementById("configuracion-auto").getAttribute("data-horario-base");
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  // Obtener tipo de generación
  const tipoGeneracion = document.getElementById("tipo-generacion").value;
  
  // Obtener grupos seleccionados
  let gruposSeleccionados = [];
  
  if (tipoGeneracion === "grupo") {
    document.querySelectorAll("#selector-grupos-grados .grupo-checkbox:checked").forEach(checkbox => {
      gruposSeleccionados.push(checkbox.value);
    });
  } else if (tipoGeneracion === "grado") {
    const gradosSeleccionados = [];
    document.querySelectorAll("#selector-grupos-grados .grado-checkbox:checked").forEach(checkbox => {
      gradosSeleccionados.push(checkbox.value);
    });
    
    gruposSeleccionados = horarioBase.grupos.filter(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      return grupo && gradosSeleccionados.includes(grupo.grado);
    });
  }
  
  if (gruposSeleccionados.length === 0) {
    alert(`Debe seleccionar al menos un ${tipoGeneracion === "grupo" ? "grupo" : "grado"}`);
    return;
  }
  
  // Obtener opciones de configuración
  const maxIntentos = parseInt(document.getElementById("max-intentos").value);
  const prioridadDirectores = document.getElementById("prioridad-directores").checked;
  const distribuirAsignaturas = document.getElementById("distribuir-asignaturas").checked;
  const algoritmo = document.getElementById("algoritmo-generacion").value;
  
  // Mostrar indicador de carga
  document.getElementById("loading-indicator").style.display = "block";
  
  // Ocultar configuración
  document.getElementById("configuracion-auto").style.display = "none";
  
  // Generar horarios
  setTimeout(() => {
    const resultado = generarHorariosAutomaticos(horarioBase, gruposSeleccionados, {
      maxIntentos,
      prioridadDirectores,
      distribuirAsignaturas,
      algoritmo
    });
    
    // Guardar los horarios generados
    window.horariosGenerados = resultado.horarios;
    
    // Ocultar indicador de carga
    document.getElementById("loading-indicator").style.display = "none";
    
    // Mostrar resultados
    document.getElementById("resultados-auto").style.display = "block";
    
    // Actualizar resultados
    actualizarResultadosAuto(resultado);
  }, 2000);
}

function actualizarResultadosAuto(resultado) {
  const resultadosContainer = document.getElementById("resultados-auto");
  const resultadoTitulo = document.getElementById("resultado-titulo");
  const resultadoMensaje = document.getElementById("resultado-mensaje");
  const conflictosContainer = document.getElementById("conflictos-container");
  const pendientesContainer = document.getElementById("pendientes-container");
  const botonesContainer = document.getElementById("botones-resultado");
  
  // Actualizar título y mensaje
  resultadoTitulo.textContent = resultado.exito ? "Generación Exitosa" : "Generación con Problemas";
  resultadoTitulo.className = resultado.exito ? "success-title" : "warning-title";
  resultadoMensaje.textContent = resultado.mensaje;
  
  // Actualizar conflictos
  if (resultado.conflictos.length > 0) {
    conflictosContainer.innerHTML = `
      <h4>Conflictos Encontrados (${resultado.conflictos.length})</h4>
      <div class="conflictos-lista">
        ${resultado.conflictos.map(conflicto => `
          <div class="conflicto-item">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${conflicto.mensaje || conflicto}</p>
          </div>
        `).join("")}
      </div>
    `;
    conflictosContainer.style.display = "block";
  } else {
    conflictosContainer.style.display = "none";
  }
  
  // Actualizar asignaciones pendientes
  if (resultado.asignacionesPendientes.length > 0) {
    pendientesContainer.innerHTML = `
      <h4>Asignaciones Pendientes (${resultado.asignacionesPendientes.length})</h4>
      <div class="pendientes-lista">
        ${resultado.asignacionesPendientes.map(pendiente => `
          <div class="pendiente-item">
            <i class="fas fa-clock"></i>
            <p>${typeof pendiente === 'string' ? pendiente : 
              `${pendiente.asignatura} con ${pendiente.docente} en ${pendiente.grupo}: 
               ${pendiente.horasPendientes} de ${pendiente.horasTotales} horas pendientes.`
            }</p>
          </div>
        `).join("")}
      </div>
    `;
    pendientesContainer.style.display = "block";
  } else {
    pendientesContainer.style.display = "none";
  }
  
  // Actualizar botones
  if (resultado.exito) {
    botonesContainer.innerHTML = `
      <button class="btn btn-primary" onclick="guardarHorariosAuto()">
        <i class="fas fa-save"></i> Guardar Horarios
      </button>
      <button class="btn" onclick="cancelarGeneracionAuto()">
        <i class="fas fa-times"></i> Cancelar
      </button>
    `;
  } else {
    botonesContainer.innerHTML = `
      <button class="btn btn-primary" onclick="reiniciarGeneracionAuto()">
        <i class="fas fa-redo"></i> Reintentar
      </button>
      <button class="btn" onclick="guardarHorariosAuto()">
        <i class="fas fa-save"></i> Guardar de Todos Modos
      </button>
      <button class="btn" onclick="cancelarGeneracionAuto()">
        <i class="fas fa-times"></i> Cancelar
      </button>
    `;
  }
}

function reiniciarGeneracionAuto() {
  document.getElementById("resultados-auto").style.display = "none";
  document.getElementById("configuracion-auto").style.display = "block";
}

function cancelarGeneracionAuto() {
  document.getElementById("selector-horario-base-auto").style.display = "block";
  document.getElementById("configuracion-auto").style.display = "none";
  document.getElementById("resultados-auto").style.display = "none";
  document.getElementById("horario-base-auto").value = "";
  document.getElementById("configuracion-auto").removeAttribute("data-horario-base");
}

function guardarHorariosAuto() {
  const horarioBaseId = document.getElementById("configuracion-auto").getAttribute("data-horario-base");
  const horarioBase = datos.horariosBase.find(h => h.id === horarioBaseId);
  if (!horarioBase) return;
  
  const horarios = window.horariosGenerados || [];
  
  if (horarios.length === 0) {
    alert("No hay horarios para guardar");
    return;
  }
  
  // Crear entrada en el historial
  const nuevaGeneracion = {
    id: generateId(),
    nombre: `Generación Automática - ${horarioBase.nombre}`,
    tipo: "automatica",
    fecha: new Date().toISOString(),
    horarioBase: horarioBase,
    horarios: horarios
  };
  
  datos.historial.push(nuevaGeneracion);
  guardarDatos();
  
  notificarExito("Horarios guardados correctamente");
  showSection("historial");
}

function iniciarGeneracionAutomatica(horarioBaseId) {
  const gruposIncompletos = verificarAsignacionesCompletas();
  if (gruposIncompletos.length > 0) {
    document.getElementById("generacion-auto-alert").style.display = "block";
    showSection("generacion-automatica");
    return;
  }
  
  showSection("generacion-automatica");
  
  const horarioBaseSelect = document.getElementById("horario-base-auto");
  horarioBaseSelect.value = horarioBaseId;
  
  seleccionarHorarioBaseAuto();
}

// =========================================
// CONFLICTOS Y ESTADÍSTICAS DE HORARIOS
// =========================================

function verificarConflictosHorario(horario) {
  const conflictos = [];
  
  // Verificar conflictos de docentes (mismo docente en dos lugares al mismo tiempo)
  const docentesHorarios = {};
  
  horario.clases.forEach(clase => {
    const key = `${clase.docente}-${clase.dia}-${clase.horaInicio}-${clase.horaFin}`;
    if (!docentesHorarios[key]) {
      docentesHorarios[key] = [];
    }
    docentesHorarios[key].push(clase);
  });
  
  // Buscar docentes con más de una clase al mismo tiempo
  Object.values(docentesHorarios).forEach(clases => {
    if (clases.length > 1) {
      const docente = datos.docentes.find(d => d.id === clases[0].docente);
      const dia = clases[0].dia;
      const hora = `${clases[0].horaInicio} - ${clases[0].horaFin}`;
      
      conflictos.push({
        tipo: "docente",
        mensaje: `El docente ${docente?.nombre || "Desconocido"} tiene ${clases.length} clases asignadas el ${dia} de ${hora}`,
        clases: clases
      });
    }
  });
  
  // Verificar restricciones de docentes
  horario.clases.forEach(clase => {
    const docente = datos.docentes.find(d => d.id === clase.docente);
    if (!docente) return;
    
    const tieneRestriccion = docente.restricciones.some(r => {
      if (r.dia !== clase.dia) return false;
      
      const restriccionInicio = convertirHoraAMinutos(r.horaInicio);
      const restriccionFin = convertirHoraAMinutos(r.horaFin);
      const claseInicio = convertirHoraAMinutos(clase.horaInicio);
      const claseFin = convertirHoraAMinutos(clase.horaFin);
      
      return (
        (claseInicio >= restriccionInicio && claseInicio < restriccionFin) ||
        (claseFin > restriccionInicio && claseFin <= restriccionFin) ||
        (claseInicio <= restriccionInicio && claseFin >= restriccionFin)
      );
    });
    
    if (tieneRestriccion) {
      conflictos.push({
        tipo: "restriccion",
        mensaje: `El docente ${docente.nombre} tiene una restricción en el horario asignado (${clase.dia} ${clase.horaInicio} - ${clase.horaFin})`,
        clase: clase
      });
    }
  });
  
  // Verificar distribución de asignaturas
  const asignaturasDistribucion = {};
  
  horario.clases.forEach(clase => {
    if (!asignaturasDistribucion[clase.asignatura]) {
      asignaturasDistribucion[clase.asignatura] = {};
    }
    
    if (!asignaturasDistribucion[clase.asignatura][clase.dia]) {
      asignaturasDistribucion[clase.asignatura][clase.dia] = 0;
    }
    
    const inicio = convertirHoraAMinutos(clase.horaInicio);
    const fin = convertirHoraAMinutos(clase.horaFin);
    const duracion = (fin - inicio) / 60;
    
    asignaturasDistribucion[clase.asignatura][clase.dia] += duracion;
  });
  
  // Verificar asignaturas con más de 3 horas en un mismo día
  Object.entries(asignaturasDistribucion).forEach(([asignaturaId, diasHoras]) => {
    const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
    if (!asignatura) return;
    
    Object.entries(diasHoras).forEach(([dia, horas]) => {
      if (horas > 3) {
        conflictos.push({
          tipo: "distribucion",
          mensaje: `La asignatura ${asignatura.nombre} tiene ${horas} horas el día ${dia}, lo cual puede ser excesivo`,
          asignatura: asignaturaId,
          dia: dia,
          horas: horas
        });
      }
    });
  });
  
  return conflictos;
}

function verificarRestriccionesHoras(grupoId, docenteId) {
  // Verificar si el docente puede manejar las horas del grupo
  const asignacionesDocente = datos.asignaciones.filter(a => a.docente === docenteId);
  const totalHoras = asignacionesDocente.reduce((total, a) => total + a.horasSemanales, 0);
  
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) {
    return {
      valido: false,
      mensaje: "Docente no encontrado"
    };
  }
  
  if (totalHoras > docente.maxHoras) {
    return {
      valido: false,
      mensaje: `El docente excedería sus horas máximas (${totalHoras}/${docente.maxHoras})`
    };
  }
  
  return {
    valido: true,
    mensaje: "Restricciones válidas"
  };
}

// Generación de estadísticas
function generarEstadisticasHorario(horarioId) {
  const generacion = datos.historial.find(h => h.id === horarioId);
  if (!generacion) return null;
  
  const estadisticas = {
    totalClases: 0,
    clasesPorDia: {},
    clasesPorDocente: {},
    clasesPorAsignatura: {},
    horasPorDocente: {},
    horasPorAsignatura: {},
    conflictos: 0,
    eficiencia: 0,
    distribucionOptima: 0
  };
  
  // Inicializar contadores por día
  generacion.horarioBase.dias.forEach(dia => {
    estadisticas.clasesPorDia[dia] = 0;
  });
  
  let totalConflictos = 0;
  let totalBloques = 0;
  let bloquesUsados = 0;
  
  // Procesar todos los horarios
  generacion.horarios.forEach(horario => {
    // Verificar conflictos
    const conflictosHorario = verificarConflictosHorario(horario);
    totalConflictos += conflictosHorario.length;
    
    // Calcular bloques totales disponibles para este grupo
    const bloques = calcularBloques(
      generacion.horarioBase.horaInicio, 
      generacion.horarioBase.horaFin, 
      generacion.horarioBase.duracionBloque, 
      generacion.horarioBase.recesos
    ).filter(b => !b.esReceso);
    
    totalBloques += bloques.length * generacion.horarioBase.dias.length;
    bloquesUsados += horario.clases.length;
    
    // Procesar clases
    horario.clases.forEach(clase => {
      estadisticas.totalClases++;
      
      // Contar clases por día
      estadisticas.clasesPorDia[clase.dia]++;
      
      // Contar clases por docente
      if (!estadisticas.clasesPorDocente[clase.docente]) {
        estadisticas.clasesPorDocente[clase.docente] = 0;
        estadisticas.horasPorDocente[clase.docente] = 0;
      }
      estadisticas.clasesPorDocente[clase.docente]++;
      
      // Contar clases por asignatura
      if (!estadisticas.clasesPorAsignatura[clase.asignatura]) {
        estadisticas.clasesPorAsignatura[clase.asignatura] = 0;
        estadisticas.horasPorAsignatura[clase.asignatura] = 0;
      }
      estadisticas.clasesPorAsignatura[clase.asignatura]++;
      
      // Calcular horas
      const inicio = convertirHoraAMinutos(clase.horaInicio);
      const fin = convertirHoraAMinutos(clase.horaFin);
      const duracion = (fin - inicio) / 60;
      
      estadisticas.horasPorDocente[clase.docente] += duracion;
      estadisticas.horasPorAsignatura[clase.asignatura] += duracion;
    });
  });
  
  estadisticas.conflictos = totalConflictos;
  estadisticas.eficiencia = totalBloques > 0 ? Math.round((bloquesUsados / totalBloques) * 100) : 0;
  
  // Calcular distribución óptima
  const distribucionDias = Object.values(estadisticas.clasesPorDia);
  const promedioDias = distribucionDias.reduce((a, b) => a + b, 0) / distribucionDias.length;
  const desviacionDias = Math.sqrt(
    distribucionDias.reduce((sum, val) => sum + Math.pow(val - promedioDias, 2), 0) / distribucionDias.length
  );
  estadisticas.distribucionOptima = Math.max(0, 100 - (desviacionDias * 10));
  
  return estadisticas;
}

// Mostrar estadísticas
function mostrarEstadisticasHorario(estadisticas) {
  if (!estadisticas) return "";
  
  // Preparar datos para visualización
  const diasLabels = Object.keys(estadisticas.clasesPorDia);
  const diasData = Object.values(estadisticas.clasesPorDia);
  
  const docentesData = [];
  Object.entries(estadisticas.horasPorDocente).forEach(([docenteId, horas]) => {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (docente) {
      docentesData.push({
        nombre: docente.nombre,
        horas: horas,
        clases: estadisticas.clasesPorDocente[docenteId] || 0
      });
    }
  });
  
  const asignaturasData = [];
  Object.entries(estadisticas.horasPorAsignatura).forEach(([asignaturaId, horas]) => {
    const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
    if (asignatura) {
      asignaturasData.push({
        nombre: asignatura.nombre,
        horas: horas,
        clases: estadisticas.clasesPorAsignatura[asignaturaId] || 0
      });
    }
  });
  
  // Ordenar por horas
  docentesData.sort((a, b) => b.horas - a.horas);
  asignaturasData.sort((a, b) => b.horas - a.horas);
  
  // Generar HTML
  return `
    <div class="estadisticas-container">
      <div class="estadisticas-resumen">
        <div class="estadistica-item">
          <div class="estadistica-valor">${estadisticas.totalClases}</div>
          <div class="estadistica-label">Total de Clases</div>
        </div>
        <div class="estadistica-item">
          <div class="estadistica-valor">${Object.keys(estadisticas.clasesPorDocente).length}</div>
          <div class="estadistica-label">Docentes</div>
        </div>
        <div class="estadistica-item">
          <div class="estadistica-valor">${Object.keys(estadisticas.clasesPorAsignatura).length}</div>
          <div class="estadistica-label">Asignaturas</div>
        </div>
        <div class="estadistica-item ${estadisticas.conflictos > 0 ? 'estadistica-warning' : 'estadistica-success'}">
          <div class="estadistica-valor">${estadisticas.conflictos}</div>
          <div class="estadistica-label">Conflictos</div>
        </div>
      </div>
      
      <div class="estadisticas-metricas">
        <div class="metrica-item">
          <div class="metrica-titulo">Eficiencia de Uso</div>
          <div class="progress-bar">
            <div class="progress" style="width: ${estadisticas.eficiencia}%">${estadisticas.eficiencia}%</div>
          </div>
        </div>
        <div class="metrica-item">
          <div class="metrica-titulo">Distribución Óptima</div>
          <div class="progress-bar">
            <div class="progress" style="width: ${estadisticas.distribucionOptima}%">${Math.round(estadisticas.distribucionOptima)}%</div>
          </div>
        </div>
      </div>
      
      <div class="estadisticas-detalle">
        <div class="estadisticas-seccion">
          <h3>Distribución por Día</h3>
          <div class="estadisticas-tabla">
            <table>
              <thead>
                <tr>
                  ${diasLabels.map(dia => `<th>${dia}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  ${diasData.map(valor => `<td>${valor}</td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="estadisticas-seccion">
          <h3>Carga por Docente</h3>
          <div class="estadisticas-tabla">
            <table>
              <thead>
                <tr>
                  <th>Docente</th>
                  <th>Horas</th>
                  <th>Clases</th>
                  <th>Carga</th>
                </tr>
              </thead>
              <tbody>
                ${docentesData.map(d => {
                  const docente = datos.docentes.find(doc => doc.nombre === d.nombre);
                  const porcentajeCarga = docente ? Math.round((d.horas / docente.maxHoras) * 100) : 0;
                  return `
                    <tr>
                      <td>${d.nombre}</td>
                      <td>${d.horas}</td>
                      <td>${d.clases}</td>
                      <td>
                        <div class="progress-bar small">
                          <div class="progress" style="width: ${porcentajeCarga}%">${porcentajeCarga}%</div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="estadisticas-seccion">
          <h3>Distribución por Asignatura</h3>
          <div class="estadisticas-tabla">
            <table>
              <thead>
                <tr>
                  <th>Asignatura</th>
                  <th>Horas</th>
                  <th>Clases</th>
                </tr>
              </thead>
              <tbody>
                ${asignaturasData.map(a => `
                  <tr>
                    <td>${a.nombre}</td>
                    <td>${a.horas}</td>
                    <td>${a.clases}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function mostrarConflictosHorario(conflictos) {
  if (conflictos.length === 0) {
    return `<div class="success-message">
      <i class="fas fa-check-circle"></i> No se encontraron conflictos en el horario.
    </div>`;
  }
  
  let html = `<div class="error-message">
    <i class="fas fa-exclamation-triangle"></i> Se encontraron ${conflictos.length} conflictos en el horario:
  </div>
  <div class="conflictos-lista">`;
  
  conflictos.forEach((conflicto, index) => {
    html += `
      <div class="conflicto-item">
        <div class="conflicto-numero">${index + 1}</div>
        <div class="conflicto-detalle">
          <div class="conflicto-tipo">${getTipoConflicto(conflicto.tipo)}</div>
          <div class="conflicto-mensaje">${conflicto.mensaje}</div>
          ${conflicto.grupo ? `<div class="conflicto-grupo">Grupo: ${conflicto.grupo}</div>` : ''}
        </div>
      </div>
    `;
  });
  
  html += `</div>`;
  return html;
}

function getTipoConflicto(tipo) {
  switch (tipo) {
    case "docente": return "Conflicto de Docente";
    case "restriccion": return "Restricción de Horario";
    case "distribucion": return "Distribución de Horas";
    default: return "Conflicto";
  }
}

// Modales para mostrar estadísticas y conflictos
function mostrarModalEstadisticas(horarioId) {
  const generacion = datos.historial.find(h => h.id === horarioId);
  if (!generacion) return;
  
  const estadisticas = generarEstadisticasHorario(horarioId);
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Estadísticas: ${generacion.nombre}`;
  modalContenido.innerHTML = mostrarEstadisticasHorario(estadisticas);
  
  modalGuardar.textContent = "Cerrar";
  modalGuardar.onclick = () => cerrarModal("modal-editar");
  
  document.getElementById("modal-editar").style.display = "block";
}

function mostrarModalConflictos(horarioId) {
  const generacion = datos.historial.find(h => h.id === horarioId);
  if (!generacion) return;
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Conflictos: ${generacion.nombre}`;
  
  // Recopilar todos los conflictos
  let todosConflictos = [];
  
  generacion.horarios.forEach(horario => {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    if (!grado) return;
    
    const conflictos = verificarConflictosHorario(horario);
    
    // Agregar información del grupo a cada conflicto
    conflictos.forEach(conflicto => {
      conflicto.grupo = `${grado?.nombre || ""} ${grupo.nombre}`;
    });
    
    todosConflictos = todosConflictos.concat(conflictos);
  });
  
  modalContenido.innerHTML = mostrarConflictosHorario(todosConflictos);
  
  modalGuardar.textContent = "Cerrar";
  modalGuardar.onclick = () => cerrarModal("modal-editar");
  
  document.getElementById("modal-editar").style.display = "block";
}

function mostrarOpcionesAnalisis(horarioId) {
  const generacion = datos.historial.find(h => h.id === horarioId);
  if (!generacion) return;
  
  const modalTitulo = document.getElementById("modal-exportar-titulo");
  const modalContenido = document.getElementById("modal-exportar-contenido");
  
  modalTitulo.textContent = `Análisis: ${generacion.nombre}`;
  
  modalContenido.innerHTML = `
    <div class="export-info">
      <p>Seleccione el tipo de análisis que desea realizar.</p>
    </div>
    <div class="export-options">
      <div class="export-option" onclick="mostrarModalEstadisticas('${horarioId}'); cerrarModal('modal-exportar');">
        <i class="fas fa-chart-bar export-icon"></i>
        <div class="export-option-title">Estadísticas</div>
        <div class="export-option-desc">Ver estadísticas detalladas del horario</div>
      </div>
      
      <div class="export-option" onclick="mostrarModalConflictos('${horarioId}'); cerrarModal('modal-exportar');">
        <i class="fas fa-exclamation-triangle export-icon"></i>
        <div class="export-option-title">Conflictos</div>
        <div class="export-option-desc">Ver conflictos y problemas detectados</div>
      </div>
      
      <div class="export-option" onclick="generarReporteCalidad('${horarioId}'); cerrarModal('modal-exportar');">
        <i class="fas fa-star export-icon"></i>
        <div class="export-option-title">Calidad</div>
        <div class="export-option-desc">Evaluar la calidad del horario generado</div>
      </div>
    </div>
  `;
  
  document.getElementById("modal-exportar").style.display = "block";
}

function generarReporteCalidad(horarioId) {
  const generacion = datos.historial.find(h => h.id === horarioId);
  if (!generacion) return;
  
  const estadisticas = generarEstadisticasHorario(horarioId);
  
  // Calcular puntuación de calidad
  let puntuacionCalidad = 100;
  
  // Penalizar por conflictos
  puntuacionCalidad -= estadisticas.conflictos * 10;
  
  // Penalizar por baja eficiencia
  if (estadisticas.eficiencia < 80) {
    puntuacionCalidad -= (80 - estadisticas.eficiencia);
  }
  
  // Penalizar por mala distribución
  if (estadisticas.distribucionOptima < 70) {
    puntuacionCalidad -= (70 - estadisticas.distribucionOptima) / 2;
  }
  
  puntuacionCalidad = Math.max(0, Math.round(puntuacionCalidad));
  
  // Determinar calificación
  let calificacion = "";
  let colorCalificacion = "";
  
  if (puntuacionCalidad >= 90) {
    calificacion = "Excelente";
    colorCalificacion = "#28a745";
  } else if (puntuacionCalidad >= 80) {
    calificacion = "Bueno";
    colorCalificacion = "#17a2b8";
  } else if (puntuacionCalidad >= 70) {
    calificacion = "Regular";
    colorCalificacion = "#ffc107";
  } else if (puntuacionCalidad >= 60) {
    calificacion = "Deficiente";
    colorCalificacion = "#fd7e14";
  } else {
    calificacion = "Muy Deficiente";
    colorCalificacion = "#dc3545";
  }
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Reporte de Calidad: ${generacion.nombre}`;
  
  modalContenido.innerHTML = `
    <div class="reporte-calidad">
      <div class="calidad-puntuacion">
        <div class="puntuacion-circle" style="border-color: ${colorCalificacion}">
          <div class="puntuacion-numero" style="color: ${colorCalificacion}">${puntuacionCalidad}</div>
          <div class="puntuacion-total">/100</div>
        </div>
        <div class="calificacion" style="color: ${colorCalificacion}">${calificacion}</div>
      </div>
      
      <div class="calidad-metricas">
        <div class="metrica">
          <div class="metrica-titulo">Conflictos</div>
          <div class="metrica-valor ${estadisticas.conflictos === 0 ? 'success' : 'warning'}">${estadisticas.conflictos}</div>
          <div class="metrica-descripcion">${estadisticas.conflictos === 0 ? 'Sin conflictos detectados' : 'Conflictos encontrados'}</div>
        </div>
        
        <div class="metrica">
          <div class="metrica-titulo">Eficiencia</div>
          <div class="metrica-valor ${estadisticas.eficiencia >= 80 ? 'success' : estadisticas.eficiencia >= 60 ? 'warning' : 'danger'}">${estadisticas.eficiencia}%</div>
          <div class="metrica-descripcion">Uso de bloques disponibles</div>
        </div>
        
        <div class="metrica">
          <div class="metrica-titulo">Distribución</div>
          <div class="metrica-valor ${estadisticas.distribucionOptima >= 70 ? 'success' : estadisticas.distribucionOptima >= 50 ? 'warning' : 'danger'}">${Math.round(estadisticas.distribucionOptima)}%</div>
          <div class="metrica-descripcion">Equilibrio entre días</div>
        </div>
      </div>
      
      <div class="calidad-recomendaciones">
        <h4>Recomendaciones para Mejorar</h4>
        <ul>
          ${estadisticas.conflictos > 0 ? '<li>Resolver los conflictos de horarios detectados</li>' : ''}
          ${estadisticas.eficiencia < 80 ? '<li>Optimizar el uso de bloques horarios disponibles</li>' : ''}
          ${estadisticas.distribucionOptima < 70 ? '<li>Mejorar la distribución de clases entre días</li>' : ''}
          ${puntuacionCalidad >= 90 ? '<li>¡Excelente trabajo! El horario está muy bien optimizado</li>' : ''}
        </ul>
      </div>
    </div>
  `;
  
  modalGuardar.textContent = "Cerrar";
  modalGuardar.onclick = () => cerrarModal("modal-editar");
  
  document.getElementById("modal-editar").style.display = "block";
}

function mostrarModalEdicion(titulo, contenido, funcionGuardar) {
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = titulo;
  modalContenido.innerHTML = contenido;
  
  // Mostrar botón guardar solo si hay función
  if (funcionGuardar) {
    modalGuardar.style.display = "inline-flex";
    modalGuardar.textContent = "Guardar";
    modalGuardar.onclick = funcionGuardar;
  } else {
    modalGuardar.style.display = "none";
  }
  
  document.getElementById("modal-editar").style.display = "block";
}

// =========================================
// HISTORIAL DE GENERACIONES
// =========================================

function cargarHistorial() {
  const container = document.getElementById("historial-container");
  
  if (datos.historial.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay horarios generados</div>';
    return;
  }
  
  container.innerHTML = "";
  
  // Ordenar historial por fecha (más reciente primero)
  const historialOrdenado = [...datos.historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
  historialOrdenado.forEach(item => {
    const card = document.createElement("div");
    card.className = "historial-card";
    
    // Contar grupos y clases
    const gruposCount = item.horarios.length;
    const clasesCount = item.horarios.reduce((total, h) => total + h.clases.length, 0);
    
    // Contar docentes únicos
    const docentesUnicos = [...new Set(item.horarios.flatMap(h => h.clases.map(c => c.docente)))];
    const docentesCount = docentesUnicos.length;
    
    card.innerHTML = `
      <div class="historial-header">
        <h3 class="historial-title">${item.nombre}</h3>
        <div class="historial-meta">
          <span><i class="fas fa-calendar-alt"></i> ${new Date(item.fecha).toLocaleDateString()}</span>
          <span><i class="fas fa-clock"></i> ${new Date(item.fecha).toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div class="historial-info">
        <div class="historial-stats">
          <div class="historial-stat">
            <div class="historial-stat-value">${gruposCount}</div>
            <div class="historial-stat-label">Grupos</div>
          </div>
          <div class="historial-stat">
            <div class="historial-stat-value">${docentesCount}</div>
            <div class="historial-stat-label">Docentes</div>
          </div>
          <div class="historial-stat">
            <div class="historial-stat-value">${clasesCount}</div>
            <div class="historial-stat-label">Clases</div>
          </div>
          <div class="historial-stat">
            <div class="historial-stat-value">${item.tipo === "manual" ? "Manual" : "Auto"}</div>
            <div class="historial-stat-label">Tipo</div>
          </div>
        </div>
      </div>
      
      <div class="historial-footer">
        <button class="btn" onclick="verHorarioDesdeHistorial('${item.id}')">
          <i class="fas fa-eye"></i> Ver Horarios
        </button>
        <button class="btn" onclick="mostrarDetallesGeneracion('${item.id}')">
          <i class="fas fa-info-circle"></i> Detalles
        </button>
        <button class="btn" onclick="mostrarOpcionesExportacion('${item.id}')">
          <i class="fas fa-file-export"></i> Exportar
        </button>
        <button class="btn btn-danger" onclick="confirmarEliminarGeneracion('${item.id}')">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function verHorarioDesdeHistorial(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  // Navegar a la sección de ver horarios
  showSection("ver-horarios");
  
  // Cargar horarios
  cargarHorariosGenerados(generacion);
}

function cargarHorariosGenerados(generacion) {
  // Guardar generación actual
  document.getElementById("ver-horarios").setAttribute("data-generacion", generacion.id);
  
  // Actualizar título
  document.getElementById("horarios-titulo").textContent = generacion.nombre;
  
  // Cargar tipo de vista
  const tipoVistaSelect = document.getElementById("tipo-vista");
  tipoVistaSelect.innerHTML = `
    <option value="grupos">Por Grupos</option>
    <option value="docentes">Por Docentes</option>
  `;
  
  // Cargar selector de grupos/docentes
  cargarSelectorHorarios(generacion, "grupos");
  
  // Mostrar horarios por grupos por defecto
  mostrarHorariosPorGrupos(generacion);
}

function cambiarTipoVista() {
  const tipoVista = document.getElementById("tipo-vista").value;
  
  // Obtener generación actual
  const generacionId = document.getElementById("ver-horarios").getAttribute("data-generacion");
  const generacion = datos.historial.find(h => h.id === generacionId);
  if (!generacion) return;
  
  // Cargar selector correspondiente
  cargarSelectorHorarios(generacion, tipoVista);
  
  if (tipoVista === "grupos") {
    mostrarHorariosPorGrupos(generacion);
  } else if (tipoVista === "docentes") {
    mostrarHorariosPorDocentes(generacion);
  }
}

function cargarSelectorHorarios(generacion, tipo) {
  const selectorContainer = document.getElementById("selector-horario-individual");
  
  if (tipo === "grupos") {
    // Cargar selector de grupos
    let options = '<option value="">Ver todos los grupos</option>';
    
    generacion.horarios.forEach(horario => {
      const grupo = datos.grupos.find(g => g.id === horario.grupo);
      if (!grupo) return;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      options += `<option value="${grupo.id}">${grado?.nombre || ""} ${grupo.nombre}</option>`;
    });
    
    selectorContainer.innerHTML = `
      <label for="selector-individual">Seleccionar grupo:</label>
      <select id="selector-individual" onchange="mostrarHorarioIndividual()">
        ${options}
      </select>
    `;
  } else {
    // Cargar selector de docentes
    const docentesIds = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
    
    let options = '<option value="">Ver todos los docentes</option>';
    
    docentesIds.forEach(docenteId => {
      const docente = datos.docentes.find(d => d.id === docenteId);
      if (!docente) return;
      
      options += `<option value="${docenteId}">${docente.nombre}</option>`;
    });
    
    selectorContainer.innerHTML = `
      <label for="selector-individual">Seleccionar docente:</label>
      <select id="selector-individual" onchange="mostrarHorarioIndividual()">
        ${options}
      </select>
    `;
  }
}

function mostrarHorarioIndividual() {
  const tipoVista = document.getElementById("tipo-vista").value;
  const valorSeleccionado = document.getElementById("selector-individual").value;
  
  // Obtener generación actual
  const generacionId = document.getElementById("ver-horarios").getAttribute("data-generacion");
  const generacion = datos.historial.find(h => h.id === generacionId);
  if (!generacion) return;
  
  if (!valorSeleccionado) {
    // Mostrar todos
    if (tipoVista === "grupos") {
      mostrarHorariosPorGrupos(generacion);
    } else {
      mostrarHorariosPorDocentes(generacion);
    }
  } else {
    // Mostrar individual
    if (tipoVista === "grupos") {
      mostrarHorarioGrupoIndividual(generacion, valorSeleccionado);
    } else {
      mostrarHorarioDocenteIndividual(generacion, valorSeleccionado);
    }
  }
}

function mostrarHorariosPorGrupos(generacion) {
  const container = document.getElementById("horarios-view");
  container.innerHTML = "";
  
  // Crear contenedor para múltiples horarios
  const horariosContainer = document.createElement("div");
  horariosContainer.className = "multiple-horarios-container";
  
  // Agrupar horarios por grado
  const horariosPorGrado = {};
  
  generacion.horarios.forEach(horario => {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    if (!grado) return;
    
    if (!horariosPorGrado[grado.id]) {
      horariosPorGrado[grado.id] = {
        grado: grado,
        horarios: []
      };
    }
    
    horariosPorGrado[grado.id].horarios.push({
      horario: horario,
      grupo: grupo
    });
  });
  
  // Crear sección para cada grado
  Object.values(horariosPorGrado).forEach(item => {
    const gradoContainer = document.createElement("div");
    gradoContainer.className = "grado-horarios-container";
    gradoContainer.innerHTML = `<h3>${item.grado.nombre}</h3>`;
    
    // Crear horario para cada grupo
    item.horarios.forEach(h => {
      const grupoContainer = document.createElement("div");
      grupoContainer.className = "grupo-horario-container horario-page";
      
      // Añadir encabezado con información del grupo
      const encabezado = document.createElement("div");
      encabezado.className = "horario-encabezado";
      encabezado.innerHTML = `
        <h4>Horario: ${item.grado.nombre} ${h.grupo.nombre}</h4>
        <p>Generación: ${generacion.nombre}</p>
        <p>Fecha: ${new Date(generacion.fecha).toLocaleDateString()}</p>
      `;
      grupoContainer.appendChild(encabezado);
      
      // Crear tabla de horario
      const tabla = crearTablaHorario(generacion.horarioBase, h.horario);
      
      grupoContainer.appendChild(tabla);
      gradoContainer.appendChild(grupoContainer);
    });
    
    horariosContainer.appendChild(gradoContainer);
  });
  
  container.appendChild(horariosContainer);
}

function mostrarHorarioGrupoIndividual(generacion, grupoId) {
  const container = document.getElementById("horarios-view");
  container.innerHTML = "";
  
  // Buscar el horario del grupo
  const horario = generacion.horarios.find(h => h.grupo === grupoId);
  if (!horario) {
    container.innerHTML = '<div class="empty-state">No se encontró el horario para este grupo</div>';
    return;
  }
  
  const grupo = datos.grupos.find(g => g.id === grupoId);
  const grado = datos.grados.find(g => g.id === grupo.grado);
  
  // Crear contenedor individual
  const grupoContainer = document.createElement("div");
  grupoContainer.className = "grupo-horario-container horario-page";
  
  // Añadir encabezado
  const encabezado = document.createElement("div");
  encabezado.className = "horario-encabezado";
  encabezado.innerHTML = `
    <h4>Horario: ${grado?.nombre || ""} ${grupo?.nombre || ""}</h4>
    <p>Generación: ${generacion.nombre}</p>
    <p>Fecha: ${new Date(generacion.fecha).toLocaleDateString()}</p>
  `;
  grupoContainer.appendChild(encabezado);
  
  // Crear tabla de horario
  const tabla = crearTablaHorario(generacion.horarioBase, horario);
  grupoContainer.appendChild(tabla);
  
  container.appendChild(grupoContainer);
}

function crearTablaHorario(horarioBase, horario) {
  // Calcular bloques de tiempo
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos);
  
  // Crear tabla
  const tabla = document.createElement("table");
  tabla.className = "horario-table";
  
  // Crear encabezado
  let thead = "<thead><tr><th></th>";
  horarioBase.dias.forEach(dia => {
    thead += `<th>${dia}</th>`;
  });
  thead += "</tr></thead>";
  
  // Crear cuerpo
  let tbody = "<tbody>";
  
  bloques.forEach(bloque => {
    tbody += `<tr><td class="time-cell">${bloque.inicio} - ${bloque.fin}</td>`;
    
    if (bloque.esReceso) {
      // Si es receso, mostrar celda de receso en todos los días
      for (let i = 0; i < horarioBase.dias.length; i++) {
        tbody += `<td class="break-cell">${bloque.nombre || "Receso"}</td>`;
      }
    } else {
      // Para cada día, buscar si hay clase
      horarioBase.dias.forEach(dia => {
        // Buscar si hay clase para este grupo en este día y bloque
        const clase = horario.clases.find(c => 
          c.dia === dia && 
          c.horaInicio === bloque.inicio && 
          c.horaFin === bloque.fin
        );
        
        if (clase) {
          const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
          const docente = datos.docentes.find(d => d.id === clase.docente);
          
          const area = asignatura ? datos.areas.find(a => a.id === asignatura.area) : null;
          const color = area ? area.color : "#cccccc";
          
          tbody += `
            <td class="class-cell">
              <div class="class-content" style="background-color: ${color}20; border-left: 4px solid ${color}">
                <div class="class-subject">${asignatura?.nombre || "Sin asignatura"}</div>
                <div class="class-teacher">${docente?.nombre || "Sin docente"}</div>
              </div>
            </td>
          `;
        } else {
          tbody += `<td></td>`;
        }
      });
    }
    
    tbody += "</tr>";
  });
  
  tbody += "</tbody>";
  
  tabla.innerHTML = thead + tbody;
  return tabla;
}

function mostrarHorariosPorDocentes(generacion) {
  const container = document.getElementById("horarios-view");
  container.innerHTML = "";
  
  // Crear contenedor para múltiples horarios
  const horariosContainer = document.createElement("div");
  horariosContainer.className = "multiple-horarios-container";
  
  // Obtener docentes únicos
  const docentesIds = [...new Set(generacion.horarios.flatMap(h => 
    h.clases.map(c => c.docente)
  ))];
  
  // Crear horario para cada docente
  docentesIds.forEach(docenteId => {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) return;
    
    const docenteContainer = document.createElement("div");
    docenteContainer.className = "docente-horario-container horario-page";
    
    // Añadir encabezado con información del docente
    const encabezado = document.createElement("div");
    encabezado.className = "horario-encabezado";
    encabezado.innerHTML = `
      <h3>Horario del Docente: ${docente.nombre}</h3>
      <p>Generación: ${generacion.nombre}</p>
      <p>Fecha: ${new Date(generacion.fecha).toLocaleDateString()}</p>
    `;
    docenteContainer.appendChild(encabezado);
    
    // Crear tabla de horario
    const tabla = crearTablaHorarioDocente(generacion.horarioBase, generacion.horarios, docenteId);
    
    docenteContainer.appendChild(tabla);
    horariosContainer.appendChild(docenteContainer);
  });
  
  container.appendChild(horariosContainer);
}

function mostrarHorarioDocenteIndividual(generacion, docenteId) {
  const container = document.getElementById("horarios-view");
  container.innerHTML = "";
  
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) {
    container.innerHTML = '<div class="empty-state">No se encontró el docente</div>';
    return;
  }
  
  // Crear contenedor individual
  const docenteContainer = document.createElement("div");
  docenteContainer.className = "docente-horario-container horario-page";
  
  // Añadir encabezado
  const encabezado = document.createElement("div");
  encabezado.className = "horario-encabezado";
  encabezado.innerHTML = `
    <h3>Horario del Docente: ${docente.nombre}</h3>
    <p>Generación: ${generacion.nombre}</p>
    <p>Fecha: ${new Date(generacion.fecha).toLocaleDateString()}</p>
  `;
  docenteContainer.appendChild(encabezado);
  
  // Crear tabla de horario
  const tabla = crearTablaHorarioDocente(generacion.horarioBase, generacion.horarios, docenteId);
  docenteContainer.appendChild(tabla);
  
  container.appendChild(docenteContainer);
}

function crearTablaHorarioDocente(horarioBase, horarios, docenteId) {
  // Calcular bloques de tiempo
  const bloques = calcularBloques(horarioBase.horaInicio, horarioBase.horaFin, horarioBase.duracionBloque, horarioBase.recesos);
  
  // Crear tabla
  const tabla = document.createElement("table");
  tabla.className = "horario-table";
  
  // Crear encabezado
  let thead = "<thead><tr><th></th>";
  horarioBase.dias.forEach(dia => {
    thead += `<th>${dia}</th>`;
  });
  thead += "</tr></thead>";
  
  // Crear cuerpo
  let tbody = "<tbody>";
  
  bloques.forEach(bloque => {
    tbody += `<tr><td class="time-cell">${bloque.inicio} - ${bloque.fin}</td>`;
    
    if (bloque.esReceso) {
      // Si es receso, mostrar celda de receso en todos los días
      for (let i = 0; i < horarioBase.dias.length; i++) {
        tbody += `<td class="break-cell">${bloque.nombre || "Receso"}</td>`;
      }
    } else {
      // Para cada día, buscar si hay clase
      horarioBase.dias.forEach(dia => {
        // Buscar si hay clase para este docente en este día y bloque
        const clase = horarios
          .flatMap(h => h.clases)
          .find(c => 
            c.docente === docenteId && 
            c.dia === dia && 
            c.horaInicio === bloque.inicio && 
            c.horaFin === bloque.fin
          );
        
        if (clase) {
          const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
          
          // Encontrar el grupo
          let grupoNombre = "";
          for (const h of horarios) {
            if (h.clases.some(c => c === clase)) {
              const grupo = datos.grupos.find(g => g.id === h.grupo);
              if (grupo) {
                const grado = datos.grados.find(g => g.id === grupo.grado);
                grupoNombre = `${grado?.nombre || ""} ${grupo.nombre}`;
              }
              break;
            }
          }
          
          const area = asignatura ? datos.areas.find(a => a.id === asignatura.area) : null;
          const color = area ? area.color : "#cccccc";
          
          tbody += `
            <td class="class-cell">
              <div class="class-content" style="background-color: ${color}20; border-left: 4px solid ${color}">
                <div class="class-subject">${asignatura?.nombre || "Sin asignatura"}</div>
                <div class="class-teacher">${grupoNombre}</div>
              </div>
            </td>
          `;
        } else {
          tbody += `<td></td>`;
        }
      });
    }
    
    tbody += "</tr>";
  });
  
  tbody += "</tbody>";
  
  tabla.innerHTML = thead + tbody;
  return tabla;
}

// Función para ver horario de docente desde la sección de docentes (NO MODIFICAR)
function verHorarioDocente(docenteId) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return;
  
  // Buscar el último horario generado que incluya a este docente
  const ultimoHorario = [...datos.historial]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .find(h => {
      // Verificar si el docente tiene clases en este horario
      return h.horarios.some(horario => 
        horario.clases.some(clase => 
          clase.docente === docenteId
        )
      );
    });
  
  const modalTitulo = document.getElementById("modal-horario-titulo");
  const modalContenido = document.getElementById("modal-horario-contenido");
  
  modalTitulo.textContent = `Horario de ${docente.nombre}`;
  
  if (!ultimoHorario) {
    modalContenido.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-calendar-times empty-icon"></i>
        <p>No hay horarios generados para este docente</p>
      </div>
    `;
  } else {
    // Crear tabla de horario
    const tabla = crearTablaHorarioDocente(ultimoHorario.horarioBase, ultimoHorario.horarios, docenteId);
    modalContenido.innerHTML = "";
    modalContenido.appendChild(tabla);
  }
  
  // Configurar botones de exportación
  document.getElementById("modal-horario-exportar-imagen").onclick = () => exportarImagenHorarioDocente(docenteId);
  document.getElementById("modal-horario-imprimir").onclick = () => imprimirHorarioDocente(docenteId);
  
  // Mostrar modal
  document.getElementById("modal-ver-horario").style.display = "block";
}

function mostrarDetallesGeneracion(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = `Detalles: ${generacion.nombre}`;
  
  // Calcular estadísticas
  const gruposCount = generacion.horarios.length;
  const clasesCount = generacion.horarios.reduce((total, h) => total + h.clases.length, 0);
  const docentesUnicos = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  const asignaturasUnicas = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.asignatura)))];
  
  modalContenido.innerHTML = `
    <div class="detalles-generacion">
      <div class="detalle-seccion">
        <h4>Información General</h4>
        <table class="detalles-tabla">
          <tr>
            <td><strong>Nombre:</strong></td>
            <td>${generacion.nombre}</td>
          </tr>
          <tr>
            <td><strong>Fecha de Generación:</strong></td>
            <td>${new Date(generacion.fecha).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Tipo:</strong></td>
            <td>${generacion.tipo === "manual" ? "Manual" : "Automática"}</td>
          </tr>
          <tr>
            <td><strong>Horario Base:</strong></td>
            <td>${generacion.horarioBase.nombre}</td>
          </tr>
        </table>
      </div>
      
      <div class="detalle-seccion">
        <h4>Estadísticas</h4>
        <div class="estadisticas-grid">
          <div class="estadistica-item">
            <div class="estadistica-valor">${gruposCount}</div>
            <div class="estadistica-label">Grupos</div>
          </div>
          <div class="estadistica-item">
            <div class="estadistica-valor">${docentesUnicos.length}</div>
            <div class="estadistica-label">Docentes</div>
          </div>
          <div class="estadistica-item">
            <div class="estadistica-valor">${asignaturasUnicas.length}</div>
            <div class="estadistica-label">Asignaturas</div>
          </div>
          <div class="estadistica-item">
            <div class="estadistica-valor">${clasesCount}</div>
            <div class="estadistica-label">Clases</div>
          </div>
        </div>
      </div>
      
      <div class="detalle-seccion">
        <h4>Horario Base Utilizado</h4>
        <table class="detalles-tabla">
          <tr>
            <td><strong>Horario:</strong></td>
            <td>${generacion.horarioBase.horaInicio} - ${generacion.horarioBase.horaFin}</td>
          </tr>
          <tr>
            <td><strong>Duración de Bloque:</strong></td>
            <td>${generacion.horarioBase.duracionBloque} minutos</td>
          </tr>
          <tr>
            <td><strong>Días:</strong></td>
            <td>${generacion.horarioBase.dias.join(", ")}</td>
          </tr>
          <tr>
            <td><strong>Recesos:</strong></td>
            <td>${generacion.horarioBase.recesos.length} configurados</td>
          </tr>
        </table>
      </div>
      
      <div class="detalle-seccion">
        <h4>Grupos Incluidos</h4>
        <div class="grupos-lista">
          ${generacion.horarios.map(h => {
            const grupo = datos.grupos.find(g => g.id === h.grupo);
            const grado = grupo ? datos.grados.find(g => g.id === grupo.grado) : null;
            return `<span class="grupo-tag">${grado?.nombre || ""} ${grupo?.nombre || "Desconocido"}</span>`;
          }).join("")}
        </div>
      </div>
    </div>
  `;
  
  // Cambiar el botón de guardar por uno de cerrar
  modalGuardar.textContent = "Cerrar";
  modalGuardar.onclick = () => cerrarModal("modal-editar");
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block";
}

function confirmarEliminarGeneracion(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Eliminación";
  modalMensaje.textContent = `¿Está seguro de eliminar la generación "${generacion.nombre}"? Esta acción no se puede deshacer y eliminará todos los horarios asociados.`;
  
  modalConfirmar.onclick = () => eliminarGeneracion(historialId);
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block";
}

function eliminarGeneracion(historialId) {
  // Eliminar generación del historial
  datos.historial = datos.historial.filter(h => h.id !== historialId);
  
  // Guardar datos
  guardarDatos();
  
  // Actualizar historial
  cargarHistorial();
  
  // Cerrar modal
  cerrarModal("modal-confirmacion");
  
  // Mostrar notificación
  notificarExito('Generación eliminada correctamente');
}

// =========================================
// EXPORTACIÓN DE HORARIOS
// =========================================

function mostrarOpcionesExportacion(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  const modalTitulo = document.getElementById("modal-exportar-titulo");
  const modalContenido = document.getElementById("modal-exportar-contenido");
  
  modalTitulo.textContent = `Exportar: ${generacion.nombre}`;
  
  modalContenido.innerHTML = `
    <div class="export-info">
      <p>Seleccione el formato de exportación para los horarios de esta generación.</p>
      <p><strong>Total:</strong> ${generacion.horarios.length} grupos, ${[...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))].length} docentes</p>
    </div>
    
    <div class="export-options">
      <div class="export-option" onclick="exportarImagenes('${historialId}')">
        <i class="fas fa-file-image export-icon"></i>
        <div class="export-option-title">Imágenes</div>
        <div class="export-option-desc">Exportar como imágenes PNG ${generacion.horarios.length > 3 ? "(ZIP)" : ""}</div>
      </div>
      
      <div class="export-option" onclick="exportarCSV('${historialId}')">
        <i class="fas fa-file-csv export-icon"></i>
        <div class="export-option-title">CSV</div>
        <div class="export-option-desc">Exportar como archivos CSV ${generacion.horarios.length > 1 ? "(ZIP)" : ""}</div>
      </div>
      
      <div class="export-option" onclick="imprimirTodos('${historialId}')">
        <i class="fas fa-print export-icon"></i>
        <div class="export-option-title">Imprimir</div>
        <div class="export-option-desc">Imprimir todos los horarios</div>
      </div>
    </div>
  `;
  
  // Mostrar modal
  document.getElementById("modal-exportar").style.display = "block";
}

function exportarImagenes(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  // Verificar si html2canvas está disponible
  if (typeof html2canvas === 'undefined') {
    notificarInfo("La funcionalidad de exportación a imagen requiere la librería html2canvas. Por favor, recargue la página.");
    return;
  }
  
  const totalHorarios = generacion.horarios.length;
  const docentesUnicos = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  const totalDocentes = docentesUnicos.length;
  const totalImagenes = totalHorarios + totalDocentes;
  
  if (totalImagenes > 3) {
    exportarImagenesZIP(historialId);
  } else {
    exportarImagenesIndividuales(historialId);
  }
  
  // Cerrar modal
  cerrarModal("modal-exportar");
}

async function exportarImagenesIndividuales(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  notificarInfo("Se exportarán las imágenes individualmente. Por favor, espere a que se complete el proceso.");

  // Exportar horarios de grupos
  for (const horario of generacion.horarios) {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) continue;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    const titulo = `Horario: ${grado?.nombre || ""} ${grupo.nombre}`;
    const tabla = crearTablaHorario(generacion.horarioBase, horario);
    const nombreArchivo = `Horario_${grado?.nombre || ""}_${grupo.nombre}.png`.replace(/\s+/g, '_');
    
    await exportarHorarioIndividualImagen(titulo, tabla, nombreArchivo);
  }
  
  // Exportar horarios de docentes
  const docentesIds = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  
  for (const docenteId of docentesIds) {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) continue;
    
    const titulo = `Horario del Docente: ${docente.nombre}`;
    const tabla = crearTablaHorarioDocente(generacion.horarioBase, generacion.horarios, docenteId);
    const nombreArchivo = `Horario_Docente_${docente.nombre}.png`.replace(/\s+/g, '_');
    
    await exportarHorarioIndividualImagen(titulo, tabla, nombreArchivo);
  }
}

async function exportarImagenesZIP(historialId) {
  // Verificar si JSZip está disponible
  if (typeof JSZip === 'undefined') {
    alert("La funcionalidad de exportación a ZIP requiere la librería JSZip. Por favor, recargue la página.");
    return;
  }
  
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  alert("Se exportarán múltiples imágenes en un archivo ZIP. Por favor, espere a que se complete el proceso.");
  
  // Crear un nuevo ZIP
  const zip = new JSZip();
  const carpeta = zip.folder(`Horarios_${generacion.nombre.replace(/\s+/g, '_')}`);
  const carpetaGrupos = carpeta.folder("Grupos");
  const carpetaDocentes = carpeta.folder("Docentes");
  
  const imagenes = [];
  
  // Exportar horarios de grupos
  for (const horario of generacion.horarios) {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) continue;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    const titulo = `Horario: ${grado?.nombre || ""} ${grupo.nombre}`;
    const tabla = crearTablaHorario(generacion.horarioBase, horario);
    const nombreArchivo = `Horario_${grado?.nombre || ""}_${grupo.nombre}.png`.replace(/\s+/g, '_');
    
    const imagen = await exportarHorarioParaZIP(titulo, tabla, nombreArchivo);
    if (imagen) {
      carpetaGrupos.file(imagen.nombre, imagen.blob);
    }
  }
  
  // Exportar horarios de docentes
  const docentesIds = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  
  for (const docenteId of docentesIds) {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) continue;
    
    const titulo = `Horario del Docente: ${docente.nombre}`;
    const tabla = crearTablaHorarioDocente(generacion.horarioBase, generacion.horarios, docenteId);
    const nombreArchivo = `Horario_Docente_${docente.nombre}.png`.replace(/\s+/g, '_');
    
    const imagen = await exportarHorarioParaZIP(titulo, tabla, nombreArchivo);
    if (imagen) {
      carpetaDocentes.file(imagen.nombre, imagen.blob);
    }
  }
  
  // Generar y descargar el ZIP
  zip.generateAsync({type: 'blob'}).then(function(content) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `Horarios_${generacion.nombre.replace(/\s+/g, '_')}.zip`;
    link.click();
  });
}

async function exportarHorarioIndividualImagen(titulo, tabla, nombreArchivo) {
  // Crear un nuevo div para el contenido a exportar
  const exportDiv = document.createElement("div");
  exportDiv.style.backgroundColor = "white";
  exportDiv.style.padding = "20px";
  exportDiv.style.maxWidth = "1000px";
  exportDiv.style.margin = "0 auto";
  
  // Agregar título
  const tituloH2 = document.createElement("h2");
  tituloH2.textContent = titulo;
  tituloH2.style.textAlign = "center";
  tituloH2.style.marginBottom = "20px";
  tituloH2.style.color = "#3046c5";
  
  exportDiv.appendChild(tituloH2);
  
  // Clonar y ajustar la tabla
  const tablaClone = tabla.cloneNode(true);
  tablaClone.style.width = "100%";
  tablaClone.style.maxWidth = "100%";
  tablaClone.style.height = "auto";
  tablaClone.style.margin = "0 auto";
  
  // Ajustar estilos de la tabla para imagen
  const celdas = tablaClone.querySelectorAll("th, td");
  celdas.forEach(celda => {
    celda.style.padding = "10px";
    celda.style.border = "1px solid #ddd";
    celda.style.textAlign = "center";
  });
  
  const encabezados = tablaClone.querySelectorAll("th");
  encabezados.forEach(th => {
    th.style.backgroundColor = "#4361ee";
    th.style.color = "white";
  });
  
  exportDiv.appendChild(tablaClone);
  
  // Añadir temporalmente al documento para capturar
  document.body.appendChild(exportDiv);
  exportDiv.style.position = "absolute";
  exportDiv.style.left = "-9999px";
  
  try {
    // Capturar como imagen
    const canvas = await html2canvas(exportDiv, {
      scale: 2,
      backgroundColor: "white",
      logging: false,
      useCORS: true
    });
    
    // Crear enlace de descarga
    const link = document.createElement('a');
    link.download = nombreArchivo;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error("Error al generar la imagen:", error);
    alert("Hubo un error al generar la imagen. Por favor, intente nuevamente.");
  } finally {
    // Eliminar el div temporal
    document.body.removeChild(exportDiv);
  }
}

async function exportarHorarioParaZIP(titulo, tabla, nombreArchivo) {
  // Crear un nuevo div para el contenido a exportar
  const exportDiv = document.createElement("div");
  exportDiv.style.backgroundColor = "white";
  exportDiv.style.padding = "20px";
  exportDiv.style.maxWidth = "1000px";
  exportDiv.style.margin = "0 auto";
  
  // Agregar título
  const tituloH2 = document.createElement("h2");
  tituloH2.textContent = titulo;
  tituloH2.style.textAlign = "center";
  tituloH2.style.marginBottom = "20px";
  tituloH2.style.color = "#3046c5";
  
  exportDiv.appendChild(tituloH2);
  
  // Clonar y ajustar la tabla
  const tablaClone = tabla.cloneNode(true);
  tablaClone.style.width = "100%";
  tablaClone.style.maxWidth = "100%";
  tablaClone.style.height = "auto";
  tablaClone.style.margin = "0 auto";
  
  // Ajustar estilos de la tabla para imagen
  const celdas = tablaClone.querySelectorAll("th, td");
  celdas.forEach(celda => {
    celda.style.padding = "10px";
    celda.style.border = "1px solid #ddd";
    celda.style.textAlign = "center";
  });
  
  const encabezados = tablaClone.querySelectorAll("th");
  encabezados.forEach(th => {
    th.style.backgroundColor = "#4361ee";
    th.style.color = "white";
  });
  
  exportDiv.appendChild(tablaClone);
  
  // Añadir temporalmente al documento para capturar
  document.body.appendChild(exportDiv);
  exportDiv.style.position = "absolute";
  exportDiv.style.left = "-9999px";
  
  try {
    // Capturar como imagen
    const canvas = await html2canvas(exportDiv, {
      scale: 2,
      backgroundColor: "white",
      logging: false,
      useCORS: true
    });
    
    // Convertir a blob
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve({
          blob,
          nombre: nombreArchivo
        });
        // Eliminar el div temporal
        document.body.removeChild(exportDiv);
      }, 'image/png');
    });
  } catch (error) {
    console.error("Error al generar la imagen:", error);
    document.body.removeChild(exportDiv);
    return null;
  }
}

function exportarCSV(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  if (generacion.horarios.length > 1) {
    exportarCSVZIP(historialId);
  } else {
    exportarCSVIndividual(historialId);
  }
  
  // Cerrar modal
  cerrarModal("modal-exportar");
}

function exportarCSVIndividual(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  // Exportar horarios de grupos
  generacion.horarios.forEach(horario => {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    
    // Preparar datos para CSV
    const datosCSV = {
      encabezados: ['Día', 'Hora', 'Asignatura', 'Docente'],
      filas: []
    };
    
    // Agregar clases al CSV
    horario.clases.forEach(clase => {
      const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
      const docente = datos.docentes.find(d => d.id === clase.docente);
      
      datosCSV.filas.push([
        clase.dia,
        `${clase.horaInicio} - ${clase.horaFin}`,
        asignatura?.nombre || "Sin asignatura",
        docente?.nombre || "Sin docente"
      ]);
    });
    
    // Generar y descargar CSV
    const csv = generarCSV(datosCSV);
    descargarCSV(csv, `Horario_${grado?.nombre || ""}_${grupo.nombre}.csv`.replace(/\s+/g, '_'));
  });
  
  // Exportar horarios de docentes
  const docentesIds = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  
  docentesIds.forEach(docenteId => {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) return;
    
    // Preparar datos para CSV
    const datosCSV = {
      encabezados: ['Día', 'Hora', 'Asignatura', 'Grupo'],
      filas: []
    };
    
    // Buscar todas las clases de este docente
    generacion.horarios.forEach(horario => {
      const grupo = datos.grupos.find(g => g.id === horario.grupo);
      if (!grupo) return;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      
      // Filtrar clases de este docente
      const clasesDocente = horario.clases.filter(c => c.docente === docenteId);
      
      clasesDocente.forEach(clase => {
        const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
        
        datosCSV.filas.push([
          clase.dia,
          `${clase.horaInicio} - ${clase.horaFin}`,
          asignatura?.nombre || "Sin asignatura",
          `${grado?.nombre || ""} ${grupo.nombre}`
        ]);
      });
    });
    
    // Generar y descargar CSV
    const csv = generarCSV(datosCSV);
    descargarCSV(csv, `Horario_Docente_${docente.nombre}.csv`.replace(/\s+/g, '_'));
  });
}

function exportarCSVZIP(historialId) {
  // Verificar si JSZip está disponible
  if (typeof JSZip === 'undefined') {
    alert("La funcionalidad de exportación a ZIP requiere la librería JSZip. Por favor, recargue la página.");
    return;
  }
  
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  // Crear un nuevo ZIP
  const zip = new JSZip();
  const carpeta = zip.folder(`Horarios_CSV_${generacion.nombre.replace(/\s+/g, '_')}`);
  const carpetaGrupos = carpeta.folder("Grupos");
  const carpetaDocentes = carpeta.folder("Docentes");
  
  // Exportar horarios de grupos
  generacion.horarios.forEach(horario => {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    
    // Preparar datos para CSV
    const datosCSV = {
      encabezados: ['Día', 'Hora', 'Asignatura', 'Docente'],
      filas: []
    };
    
    // Agregar clases al CSV
    horario.clases.forEach(clase => {
      const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
      const docente = datos.docentes.find(d => d.id === clase.docente);
      
      datosCSV.filas.push([
        clase.dia,
        `${clase.horaInicio} - ${clase.horaFin}`,
        asignatura?.nombre || "Sin asignatura",
        docente?.nombre || "Sin docente"
      ]);
    });
    
    // Generar CSV y agregar al ZIP
    const csv = generarCSV(datosCSV);
    const nombreArchivo = `Horario_${grado?.nombre || ""}_${grupo.nombre}.csv`.replace(/\s+/g, '_');
    carpetaGrupos.file(nombreArchivo, csv);
  });
  
  // Exportar horarios de docentes
  const docentesIds = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  
  docentesIds.forEach(docenteId => {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) return;
    
    // Preparar datos para CSV
    const datosCSV = {
      encabezados: ['Día', 'Hora', 'Asignatura', 'Grupo'],
      filas: []
    };
    
    // Buscar todas las clases de este docente
    generacion.horarios.forEach(horario => {
      const grupo = datos.grupos.find(g => g.id === horario.grupo);
      if (!grupo) return;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      
      // Filtrar clases de este docente
      const clasesDocente = horario.clases.filter(c => c.docente === docenteId);
      
      clasesDocente.forEach(clase => {
        const asignatura = datos.asignaturas.find(a => a.id === clase.asignatura);
        
        datosCSV.filas.push([
          clase.dia,
          `${clase.horaInicio} - ${clase.horaFin}`,
          asignatura?.nombre || "Sin asignatura",
          `${grado?.nombre || ""} ${grupo.nombre}`
        ]);
      });
    });
    
    // Generar CSV y agregar al ZIP
    const csv = generarCSV(datosCSV);
    const nombreArchivo = `Horario_Docente_${docente.nombre}.csv`.replace(/\s+/g, '_');
    carpetaDocentes.file(nombreArchivo, csv);
  });
  
  // Generar y descargar el ZIP
  zip.generateAsync({type: 'blob'}).then(function(content) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `Horarios_CSV_${generacion.nombre.replace(/\s+/g, '_')}.zip`;
    link.click();
  });
}

function generarCSV(datos) {
  let csv = '';
  
  // Agregar encabezados
  csv += datos.encabezados.join(',') + '\n';
  
  // Agregar filas
  datos.filas.forEach(fila => {
    csv += fila.map(campo => `"${campo}"`).join(',') + '\n';
  });
  
  return csv;
}

function descargarCSV(csv, nombreArchivo) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo;
  link.click();
}

function imprimirTodos(historialId) {
  const generacion = datos.historial.find(h => h.id === historialId);
  if (!generacion) return;
  
  const totalHorarios = generacion.horarios.length;
  const docentesUnicos = [...new Set(generacion.horarios.flatMap(h => h.clases.map(c => c.docente)))];
  const totalDocentes = docentesUnicos.length;
  
  alert(`Se imprimirán ${totalHorarios} horarios de grupos y ${totalDocentes} horarios de docentes. Por favor, confirme cada impresión.`);
  
  // Imprimir horarios de grupos
  generacion.horarios.forEach(horario => {
    const grupo = datos.grupos.find(g => g.id === horario.grupo);
    if (!grupo) return;
    
    const grado = datos.grados.find(g => g.id === grupo.grado);
    const titulo = `Horario: ${grado?.nombre || ""} ${grupo.nombre}`;
    const subtitulo = `Generación: ${generacion.nombre} - Fecha: ${new Date(generacion.fecha).toLocaleDateString()}`;
    const tabla = crearTablaHorario(generacion.horarioBase, horario);
    
    imprimirHorarioIndividual(titulo, subtitulo, tabla);
  });
  
  // Imprimir horarios de docentes
  docentesUnicos.forEach(docenteId => {
    const docente = datos.docentes.find(d => d.id === docenteId);
    if (!docente) return;
    
    const titulo = `Horario del Docente: ${docente.nombre}`;
    const subtitulo = `Generación: ${generacion.nombre} - Fecha: ${new Date(generacion.fecha).toLocaleDateString()}`;
    const tabla = crearTablaHorarioDocente(generacion.horarioBase, generacion.horarios, docenteId);
    
    imprimirHorarioIndividual(titulo, subtitulo, tabla);
  });
  
  // Cerrar modal
  cerrarModal("modal-exportar");
}

function imprimirHorarioIndividual(titulo, subtitulo, tabla) {
  // Crear ventana de impresión
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>${titulo}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 20px; 
        }
        h3, h4 { 
          margin: 5px 0; 
          color: #3046c5;
        }
        p {
          margin: 5px 0;
          color: #495057;
        }
        table { 
          width: 100%;
          height: 96%;
          border-collapse: collapse; 
          margin-bottom: 20px; 
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: center; 
        }
        th { 
          background-color: #4361ee; 
          color: white; 
        }
        .time-cell { 
          font-weight: bold; 
          background-color: #f9f9f9; 
        }
        .break-cell { 
          background-color: #f0f0f0; 
          font-style: italic; 
        }
        .class-content { 
          padding: 5px; 
          border-radius: 4px; 
        }
        .class-subject { 
          font-weight: bold; 
        }
        .class-teacher { 
          font-size: 0.9em; 
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact; 
          }
        }
      </style>
    </head>
    <body>
      <h3>${titulo}</h3>
      <p>${subtitulo}</p>
      ${tabla.outerHTML}
      <script>
        window.onload = function() { window.print(); window.close(); }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Funciones para exportar e imprimir horario de docente desde sección de docentes (NO MODIFICAR)
function exportarImagenHorarioDocente(docenteId) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return;
  
  const modalContenido = document.getElementById("modal-horario-contenido");
  
  // Crear un nuevo div para el contenido a exportar
  const exportDiv = document.createElement("div");
  exportDiv.style.backgroundColor = "white";
  exportDiv.style.padding = "20px";
  exportDiv.style.maxWidth = "1000px";
  exportDiv.style.margin = "0 auto";
  
  // Agregar título
  const titulo = document.createElement("h2");
  titulo.textContent = `Horario de ${docente.nombre}`;
  titulo.style.textAlign = "center";
  titulo.style.marginBottom = "20px";
  titulo.style.color = "#3046c5";
  
  exportDiv.appendChild(titulo);
  
  // Clonar y ajustar la tabla
  const tablaClone = modalContenido.querySelector("table").cloneNode(true);
  tablaClone.style.width = "100%";
  tablaClone.style.maxWidth = "100%";
  tablaClone.style.height = "auto";
  tablaClone.style.margin = "0 auto";
  
  // Ajustar estilos de la tabla para imagen
  const celdas = tablaClone.querySelectorAll("th, td");
  celdas.forEach(celda => {
    celda.style.padding = "10px";
    celda.style.border = "1px solid #ddd";
    celda.style.textAlign = "center";
  });
  
  const encabezados = tablaClone.querySelectorAll("th");
  encabezados.forEach(th => {
    th.style.backgroundColor = "#4361ee";
    th.style.color = "white";
  });
  
  exportDiv.appendChild(tablaClone);
  
  // Añadir temporalmente al documento para capturar
  document.body.appendChild(exportDiv);
  exportDiv.style.position = "absolute";
  exportDiv.style.left = "-9999px";
  
  // Verificar si html2canvas está disponible
  if (typeof html2canvas !== 'undefined') {
    // Capturar como imagen
    html2canvas(exportDiv, {
      scale: 2,
      backgroundColor: "white",
      logging: false,
      useCORS: true
    }).then(canvas => {
      // Crear enlace de descarga
      const link = document.createElement('a');
      link.download = `Horario_${docente.nombre.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      // Eliminar el div temporal
      document.body.removeChild(exportDiv);
    }).catch(error => {
      console.error("Error al generar la imagen:", error);
      alert("Error al generar la imagen. Verifique que la librería html2canvas esté cargada.");
      document.body.removeChild(exportDiv);
    });
  } else {
    alert("La funcionalidad de exportación a imagen requiere la librería html2canvas. Por favor, recargue la página.");
    document.body.removeChild(exportDiv);
  }
}

function imprimirHorarioDocente(docenteId) {
  const docente = datos.docentes.find(d => d.id === docenteId);
  if (!docente) return;
  
  const modalContenido = document.getElementById("modal-horario-contenido");
  
  // Crear ventana de impresión
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
    <head>
      <title>Horario de ${docente.nombre}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          padding: 0; 
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        h2 { 
          text-align: center; 
          margin-bottom: 20px; 
          color: #3046c5;
        }
        table { 
          width: 100%; 
          height: 100%; 
          border-collapse: collapse; 
          margin: 0 auto;
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 10px; 
          text-align: center; 
        }
        th { 
          background-color: #4361ee; 
          color: white; 
        }
        .time-cell { 
          font-weight: bold; 
          background-color: #f9f9f9; 
        }
        .break-cell { 
          background-color: #f0f0f0; 
          font-style: italic; 
        }
        .class-content { 
          padding: 5px; 
          border-radius: 4px; 
        }
        .class-subject { 
          font-weight: bold; 
        }
        .class-teacher { 
          font
        }
        .class-subject { 
          font-weight: bold; 
        }
        .class-teacher { 
          font-size: 0.9em; 
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact; 
          }
          .container {
            width: 100%;
            padding: 0;
          }
          table {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Horario de ${docente.nombre}</h2>
        ${modalContenido.querySelector("table").outerHTML}
      </div>
      <script>
        window.onload = function() { window.print(); window.close(); }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// =========================================
// CONFIGURACIONES
// =========================================

// Reemplaza la función toggleModoOscuro
function toggleModoOscuro() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');
  
  // Guardar preferencia en localStorage
  localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  
  // Actualizar icono del botón en la barra de navegación
  const modoOscuroBtn = document.getElementById('modo-oscuro-btn');
  if (modoOscuroBtn) {
    modoOscuroBtn.innerHTML = isDarkMode ? 
      '<i class="fas fa-sun"></i>' : 
      '<i class="fas fa-moon"></i>';
    modoOscuroBtn.title = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }
  
  // Actualizar icono del botón en la sección de configuración
  const configBtn = document.querySelector('.config-option button');
  if (configBtn) {
    configBtn.innerHTML = isDarkMode ? 
      '<i class="fas fa-sun"></i> Alternar Modo Claro' : 
      '<i class="fas fa-moon"></i> Alternar Modo Oscuro';
  }
  
  // Notificar al usuario
  notificarInfo(`Modo ${isDarkMode ? 'oscuro' : 'claro'} activado`);
}

// sincronizarToggleModoOscuro
function sincronizarToggleModoOscuro() {
  const toggleModoOscuro = document.getElementById('toggle-dark-mode');
  if (toggleModoOscuro) {
    // Sincronizar con el estado actual
    toggleModoOscuro.checked = document.body.classList.contains('dark-mode');
    
    // Añadir evento para cambiar el modo
    toggleModoOscuro.addEventListener('change', function() {
      toggleModoOscuro();
    });
  }
}

// Reemplaza la función inicializarModoOscuro
function inicializarModoOscuro() {
  // Verificar preferencia guardada
  const darkModeSaved = localStorage.getItem('darkMode');
  
  if (darkModeSaved === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Agregar botón en la barra de navegación
  const headerActions = document.querySelector('.header-actions');
  if (headerActions) {
    const modoOscuroBtn = document.createElement('button');
    modoOscuroBtn.id = 'modo-oscuro-btn';
    modoOscuroBtn.className = 'btn-icon';
    modoOscuroBtn.title = document.body.classList.contains('dark-mode') ? 
      'Cambiar a modo claro' : 
      'Cambiar a modo oscuro';
    modoOscuroBtn.innerHTML = document.body.classList.contains('dark-mode') ? 
      '<i class="fas fa-sun"></i>' : 
      '<i class="fas fa-moon"></i>';
    modoOscuroBtn.onclick = toggleModoOscuro;
    
    headerActions.prepend(modoOscuroBtn);
  }
  
  // Sincronizar toggle en panel de configuración
  sincronizarToggleModoOscuro();
}

// =========================================
// ELIMINACIÓN DE DATOS LOCALES
// =========================================

function confirmarBorrarDatos() {
  // Mostrar modal de confirmación
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  const modalCancelar = document.getElementById("modal-cancelar");
  
  modalTitulo.textContent = "Confirmar Eliminación de Datos";
  modalMensaje.textContent = "¿Está seguro de borrar TODOS los datos? Esta acción no se puede deshacer y eliminará todos los docentes, asignaturas, grupos, horarios y demás información.";
  
  modalConfirmar.onclick = function() {
    borrarTodosLosDatos();
    cerrarModal("modal-confirmacion");
  };
  
  modalCancelar.onclick = function() {
    cerrarModal("modal-confirmacion");
  };
  
  // Mostrar modal
  document.getElementById("modal-confirmacion").style.display = "block";
}

function borrarTodosLosDatos() {
  // Crear un backup automático antes de borrar
  const backup = crearBackup("Backup automático antes de borrar todos los datos");
  
  // Reiniciar todos los datos
  datos = {
    grados: [],
    areas: [],
    docentes: [],
    asignaturas: [],
    grupos: [],
    asignaciones: [],
    horariosBase: [],
    horarios: [],
    historial: []
  };
  
  // Guardar datos vacíos
  guardarDatos();
  
  // Recargar todas las tablas
  cargarTablaDocentes();
  cargarTablaAsignaturas();
  cargarTablaGrupos();
  cargarTablaAsignaciones();
  cargarTablaGrados();
  cargarTablaAreas();
  
  // Actualizar estadísticas
  actualizarEstadisticas();
  
  // Mostrar notificación
  notificarExito('Todos los datos han sido borrados. Se ha creado un backup automático por si necesita recuperarlos.');
}

// =========================================
// SISTEMA DE REPORTES
// =========================================

function mostrarReportesPersonalizados() {
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = 'Reportes Personalizados';
  
  modalContenido.innerHTML = `
    <div class="reportes-container">
      <p>Seleccione el tipo de reporte que desea generar:</p>
      
      <div class="reportes-opciones">
        <div class="reporte-opcion" onclick="generarReporteDocentes()">
          <div class="reporte-icono">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <div class="reporte-titulo">Docentes</div>
          <div class="reporte-descripcion">Reporte detallado de docentes y sus asignaciones</div>
        </div>
        
        <div class="reporte-opcion" onclick="generarReporteGrupos()">
          <div class="reporte-icono">
            <i class="fas fa-users"></i>
          </div>
          <div class="reporte-titulo">Grupos</div>
          <div class="reporte-descripcion">Reporte detallado de grupos y sus asignaturas</div>
        </div>
        
        <div class="reporte-opcion" onclick="generarReporteAsignaturas()">
          <div class="reporte-icono">
            <i class="fas fa-book"></i>
          </div>
          <div class="reporte-titulo">Asignaturas</div>
          <div class="reporte-descripcion">Reporte detallado de asignaturas y su distribución</div>
        </div>
        
        <div class="reporte-opcion" onclick="generarReporteHorarios()">
          <div class="reporte-icono">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div class="reporte-titulo">Horarios</div>
          <div class="reporte-descripcion">Reporte detallado de horarios generados</div>
        </div>
        
        <div class="reporte-opcion" onclick="generarReporteConflictos()">
          <div class="reporte-icono">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="reporte-titulo">Conflictos</div>
          <div class="reporte-descripcion">Análisis de conflictos en horarios</div>
        </div>
        
        <div class="reporte-opcion" onclick="generarReporteEstadisticas()">
          <div class="reporte-icono">
            <i class="fas fa-chart-pie"></i>
          </div>
          <div class="reporte-titulo">Estadísticas</div>
          <div class="reporte-descripcion">Estadísticas generales del sistema</div>
        </div>
      </div>
    </div>
  `;
  
  modalGuardar.style.display = "none";
  document.getElementById("modal-editar").style.display = "block";
}

function generarReporteDocentes() {
  const docentesData = datos.docentes.map(docente => {
    const asignaciones = datos.asignaciones.filter(a => a.docente === docente.id);
    const horasTotales = asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
    
    const gruposIds = [...new Set(asignaciones.map(a => a.grupo))];
    const grupos = gruposIds.map(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return null;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      return {
        id: grupo.id,
        nombre: `${grado?.nombre || ""} ${grupo.nombre}`
      };
    }).filter(Boolean);
    
    const asignaturasIds = [...new Set(asignaciones.map(a => a.asignatura))];
    const asignaturas = asignaturasIds.map(asignaturaId => {
      const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
      return asignatura ? {
        id: asignatura.id,
        nombre: asignatura.nombre
      } : null;
    }).filter(Boolean);
    
    let grupoDirector = null;
    if (docente.directorGrupo) {
      const grupo = datos.grupos.find(g => g.id === docente.directorGrupo);
      if (grupo) {
        const grado = datos.grados.find(g => g.id === grupo.grado);
        grupoDirector = `${grado?.nombre || ""} ${grupo.nombre}`;
      }
    }
    
    return {
      id: docente.id,
      nombre: docente.nombre,
      horasTotales,
      horasMaximas: docente.maxHoras,
      porcentajeOcupacion: Math.round((horasTotales / docente.maxHoras) * 100),
      restricciones: docente.restricciones.length,
      grupos,
      asignaturas,
      grupoDirector
    };
  });
  
  docentesData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  mostrarReporteEnModal('Reporte de Docentes', generarHTMLReporteDocentes(docentesData));
}

function generarReporteGrupos() {
  const gruposData = datos.grupos.map(grupo => {
    const grado = datos.grados.find(g => g.id === grupo.grado);
    const asignaciones = datos.asignaciones.filter(a => a.grupo === grupo.id);
    
    const asignaturasIds = [...new Set(asignaciones.map(a => a.asignatura))];
    const asignaturas = asignaturasIds.map(asignaturaId => {
      const asignatura = datos.asignaturas.find(a => a.id === asignaturaId);
      const asignacion = asignaciones.find(a => a.asignatura === asignaturaId);
      const docente = datos.docentes.find(d => d.id === asignacion?.docente);
      
      return {
        id: asignatura?.id,
        nombre: asignatura?.nombre || "Desconocida",
        horas: asignacion?.horasSemanales || 0,
        docente: docente?.nombre || "Sin docente"
      };
    });
    
    const director = datos.docentes.find(d => d.directorGrupo === grupo.id);
    
    return {
      id: grupo.id,
      nombre: `${grado?.nombre || ""} ${grupo.nombre}`,
      grado: grado?.nombre || "Sin grado",
      asignaturas,
      totalHoras: asignaturas.reduce((total, a) => total + a.horas, 0),
      director: director?.nombre || "Sin director"
    };
  });
  
  gruposData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  mostrarReporteEnModal('Reporte de Grupos', generarHTMLReporteGrupos(gruposData));
}

function generarReporteAsignaturas() {
  const asignaturasData = datos.asignaturas.map(asignatura => {
    const area = datos.areas.find(a => a.id === asignatura.area);
    const asignaciones = datos.asignaciones.filter(a => a.asignatura === asignatura.id);
    
    const gruposIds = [...new Set(asignaciones.map(a => a.grupo))];
    const grupos = gruposIds.map(grupoId => {
      const grupo = datos.grupos.find(g => g.id === grupoId);
      if (!grupo) return null;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      const asignacion = asignaciones.find(a => a.grupo === grupoId);
      const docente = datos.docentes.find(d => d.id === asignacion?.docente);
      
      return {
        id: grupo.id,
        nombre: `${grado?.nombre || ""} ${grupo.nombre}`,
        horas: asignacion?.horasSemanales || 0,
        docente: docente?.nombre || "Sin docente"
      };
    }).filter(Boolean);
    
    const docentesIds = [...new Set(asignaciones.map(a => a.docente))];
    const docentes = docentesIds.map(docenteId => {
      const docente = datos.docentes.find(d => d.id === docenteId);
      return docente ? docente.nombre : "Desconocido";
    });
    
    return {
      id: asignatura.id,
      nombre: asignatura.nombre,
      identificador: asignatura.identificador,
      area: area?.nombre || "Sin área",
      color: area?.color || "#cccccc",
      grupos,
      docentes,
      totalHoras: grupos.reduce((total, g) => total + g.horas, 0)
    };
  });
  
  asignaturasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  mostrarReporteEnModal('Reporte de Asignaturas', generarHTMLReporteAsignaturas(asignaturasData));
}

function generarReporteHorarios() {
  if (datos.historial.length === 0) {
    alert("No hay horarios generados para mostrar en el reporte");
    return;
  }
  
  const horariosData = datos.historial.map(generacion => {
    const gruposCount = generacion.horarios.length;
    const clasesCount = generacion.horarios.reduce((total, h) => total + h.clases.length, 0);
    
    return {
      id: generacion.id,
      nombre: generacion.nombre,
      fecha: new Date(generacion.fecha).toLocaleString(),
      tipo: generacion.tipo,
      gruposCount,
      clasesCount,
      horarioBase: generacion.horarioBase.nombre
    };
  });
  
  horariosData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
  mostrarReporteEnModal('Reporte de Horarios', generarHTMLReporteHorarios(horariosData));
}

function generarReporteConflictos() {
  if (datos.historial.length === 0) {
    alert("No hay horarios generados para analizar conflictos");
    return;
  }
  
  const conflictosData = [];
  
  datos.historial.forEach(generacion => {
    generacion.horarios.forEach(horario => {
      const grupo = datos.grupos.find(g => g.id === horario.grupo);
      if (!grupo) return;
      
      const grado = datos.grados.find(g => g.id === grupo.grado);
      if (!grado) return;
      
      const conflictos = verificarConflictosHorario(horario);
      
      conflictos.forEach(conflicto => {
        conflictosData.push({
          generacion: generacion.nombre,
          fecha: new Date(generacion.fecha).toLocaleString(),
          grupo: `${grado?.nombre || ""} ${grupo.nombre}`,
          tipo: conflicto.tipo,
          mensaje: conflicto.mensaje
        });
      });
    });
  });
  
  conflictosData.sort((a, b) => {
    if (a.generacion !== b.generacion) {
      return a.generacion.localeCompare(b.generacion);
    }
    return a.grupo.localeCompare(b.grupo);
  });
  
  mostrarReporteEnModal('Reporte de Conflictos', generarHTMLReporteConflictos(conflictosData));
}

function generarReporteEstadisticas() {
  const estadisticas = {
    docentes: datos.docentes.length,
    asignaturas: datos.asignaturas.length,
    grupos: datos.grupos.length,
    areas: datos.areas.length,
    grados: datos.grados.length,
    asignaciones: datos.asignaciones.length,
    horariosBase: datos.horariosBase.length,
    horarios: datos.historial.length,
    
    horasTotales: datos.asignaciones.reduce((total, a) => total + a.horasSemanales, 0),
    promedioHorasDocente: 0,
    promedioAsignaturasGrupo: 0,
    
    tiposGeneracion: {
      manual: 0,
      automatica: 0
    }
  };
  
  if (datos.docentes.length > 0) {
    estadisticas.promedioHorasDocente = Math.round(estadisticas.horasTotales / datos.docentes.length);
  }
  
  if (datos.grupos.length > 0) {
    estadisticas.promedioAsignaturasGrupo = Math.round(datos.asignaciones.length / datos.grupos.length);
  }
  
  datos.historial.forEach(h => {
    if (h.tipo === "manual") {
      estadisticas.tiposGeneracion.manual++;
    } else {
      estadisticas.tiposGeneracion.automatica++;
    }
  });
  
  mostrarReporteEnModal('Estadísticas del Sistema', generarHTMLReporteEstadisticas(estadisticas));
}

// Funciones auxiliares para generar HTML de reportes
function mostrarReporteEnModal(titulo, contenidoHTML) {
  const modalTitulo = document.getElementById("modal-reportes").querySelector("h3");
  const modalContenido = document.getElementById("modal-reportes-contenido");
  
  modalTitulo.textContent = titulo;
  modalContenido.innerHTML = contenidoHTML;
  
  cerrarModal("modal-editar");
  document.getElementById("modal-reportes").style.display = "block";
}

function generarHTMLReporteDocentes(docentesData) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="exportarReporteCSV('docentes')">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-docentes')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-docentes">
        <h2>Reporte de Docentes</h2>
        <p>Total de docentes: ${docentesData.length}</p>
        
        <table class="reporte-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Horas Asignadas</th>
              <th>Horas Máximas</th>
              <th>Ocupación</th>
              <th>Restricciones</th>
              <th>Director de Grupo</th>
            </tr>
          </thead>
          <tbody>
            ${docentesData.map(docente => `
              <tr>
                <td>${docente.nombre}</td>
                <td>${docente.horasTotales}</td>
                <td>${docente.horasMaximas}</td>
                <td>
                  <div class="progress-bar">
                    <div class="progress" style="width: ${docente.porcentajeOcupacion}%">${docente.porcentajeOcupacion}%</div>
                  </div>
                </td>
                <td>${docente.restricciones}</td>
                <td>${docente.grupoDirector || 'No'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h3>Detalle por Docente</h3>
        
        ${docentesData.map(docente => `
          <div class="docente-detalle">
            <h4>${docente.nombre}</h4>
            
            <div class="docente-info">
              <p><strong>Horas Asignadas:</strong> ${docente.horasTotales} de ${docente.horasMaximas} (${docente.porcentajeOcupacion}%)</p>
              <p><strong>Restricciones:</strong> ${docente.restricciones}</p>
              ${docente.grupoDirector ? `<p><strong>Director de Grupo:</strong> ${docente.grupoDirector}</p>` : ''}
            </div>
            
            <div class="docente-asignaciones">
              <h5>Asignaturas</h5>
              ${docente.asignaturas.length === 0 ? 
                '<p class="empty-state">No hay asignaturas asignadas</p>' : 
                `<ul>${docente.asignaturas.map(a => `<li>${a.nombre}</li>`).join('')}</ul>`
              }
              
              <h5>Grupos</h5>
              ${docente.grupos.length === 0 ? 
                '<p class="empty-state">No hay grupos asignados</p>' : 
                `<ul>${docente.grupos.map(g => `<li>${g.nombre}</li>`).join('')}</ul>`
              }
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generarHTMLReporteGrupos(gruposData) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="exportarReporteCSV('grupos')">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-grupos')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-grupos">
        <h2>Reporte de Grupos</h2>
        <p>Total de grupos: ${gruposData.length}</p>
        
        <table class="reporte-tabla">
          <thead>
            <tr>
              <th>Grupo</th>
              <th>Grado</th>
              <th>Director</th>
              <th>Total Horas</th>
              <th>Asignaturas</th>
            </tr>
          </thead>
          <tbody>
            ${gruposData.map(grupo => `
              <tr>
                <td>${grupo.nombre}</td>
                <td>${grupo.grado}</td>
                <td>${grupo.director}</td>
                <td>${grupo.totalHoras}</td>
                <td>${grupo.asignaturas.length}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h3>Detalle por Grupo</h3>
        
        ${gruposData.map(grupo => `
          <div class="grupo-detalle">
            <h4>${grupo.nombre}</h4>
            
            <div class="grupo-info">
              <p><strong>Grado:</strong> ${grupo.grado}</p>
              <p><strong>Director:</strong> ${grupo.director}</p>
              <p><strong>Total Horas:</strong> ${grupo.totalHoras}</p>
            </div>
            
            <div class="grupo-asignaturas">
              <h5>Asignaturas</h5>
              ${grupo.asignaturas.length === 0 ? 
                '<p class="empty-state">No hay asignaturas asignadas</p>' : 
                `<table class="reporte-tabla">
                  <thead>
                    <tr>
                      <th>Asignatura</th>
                      <th>Docente</th>
                      <th>Horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${grupo.asignaturas.map(a => `
                      <tr>
                        <td>${a.nombre}</td>
                        <td>${a.docente}</td>
                        <td>${a.horas}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`
              }
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generarHTMLReporteAsignaturas(asignaturasData) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="exportarReporteCSV('asignaturas')">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-asignaturas')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-asignaturas">
        <h2>Reporte de Asignaturas</h2>
        <p>Total de asignaturas: ${asignaturasData.length}</p>
        
        <table class="reporte-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Área</th>
              <th>Total Horas</th>
              <th>Grupos</th>
              <th>Docentes</th>
            </tr>
          </thead>
          <tbody>
            ${asignaturasData.map(asignatura => `
              <tr>
                <td>${asignatura.identificador}</td>
                <td>${asignatura.nombre}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="width: 15px; height: 15px; background-color: ${asignatura.color}; border-radius: 50%;"></div>
                    ${asignatura.area}
                  </div>
                </td>
                <td>${asignatura.totalHoras}</td>
                <td>${asignatura.grupos.length}</td>
                <td>${asignatura.docentes.length}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <h3>Detalle por Asignatura</h3>
        
        ${asignaturasData.map(asignatura => `
          <div class="asignatura-detalle">
            <h4>${asignatura.nombre} (${asignatura.identificador})</h4>
            
            <div class="asignatura-info">
              <p><strong>Área:</strong> ${asignatura.area}</p>
              <p><strong>Total Horas:</strong> ${asignatura.totalHoras}</p>
            </div>
            
            <div class="asignatura-grupos">
              <h5>Grupos y Docentes</h5>
              ${asignatura.grupos.length === 0 ? 
                '<p class="empty-state">No hay grupos asignados</p>' : 
                `<table class="reporte-tabla">
                  <thead>
                    <tr>
                      <th>Grupo</th>
                      <th>Docente</th>
                      <th>Horas</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${asignatura.grupos.map(g => `
                      <tr>
                        <td>${g.nombre}</td>
                        <td>${g.docente}</td>
                        <td>${g.horas}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>`
              }
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generarHTMLReporteHorarios(horariosData) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="exportarReporteCSV('horarios')">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-horarios')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-horarios">
        <h2>Reporte de Horarios</h2>
        <p>Total de generaciones: ${horariosData.length}</p>
        
        <table class="reporte-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Horario Base</th>
              <th>Grupos</th>
              <th>Clases</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${horariosData.map(horario => `
              <tr>
                <td>${horario.nombre}</td>
                <td>${horario.fecha}</td>
                <td>${horario.tipo}</td>
                <td>${horario.horarioBase}</td>
                <td>${horario.gruposCount}</td>
                <td>${horario.clasesCount}</td>
                <td>
                  <button class="btn-icon" onclick="verHorarioDesdeHistorial('${horario.id}')">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function generarHTMLReporteConflictos(conflictosData) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="exportarReporteCSV('conflictos')">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-conflictos')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-conflictos">
        <h2>Reporte de Conflictos</h2>
        <p>Total de conflictos: ${conflictosData.length}</p>
        
        ${conflictosData.length === 0 ? 
          '<div class="success-message"><i class="fas fa-check-circle"></i> No se encontraron conflictos en los horarios.</div>' :
          `<table class="reporte-tabla">
            <thead>
              <tr>
                <th>Generación</th>
                <th>Fecha</th>
                <th>Grupo</th>
                <th>Tipo</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              ${conflictosData.map(conflicto => `
                <tr>
                  <td>${conflicto.generacion}</td>
                  <td>${conflicto.fecha}</td>
                  <td>${conflicto.grupo}</td>
                  <td>${getTipoConflicto(conflicto.tipo)}</td>
                  <td>${conflicto.mensaje}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>`
        }
      </div>
    </div>
  `;
}

function generarHTMLReporteEstadisticas(estadisticas) {
  return `
    <div class="reporte-container">
      <div class="reporte-acciones">
        <button class="btn btn-primary" onclick="imprimirReporte('reporte-estadisticas')">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
      
      <div class="reporte-contenido" id="reporte-estadisticas">
        <h2>Estadísticas del Sistema</h2>
        
        <div class="estadisticas-resumen">
          <div class="estadistica-item">
            <div class="estadistica-valor">${estadisticas.docentes}</div>
            <div class="estadistica-label">Docentes</div>
          </div>
          
          <div class="estadistica-item">
            <div class="estadistica-valor">${estadisticas.asignaturas}</div>
            <div class="estadistica-label">Asignaturas</div>
          </div>
          
          <div class="estadistica-item">
            <div class="estadistica-valor">${estadisticas.grupos}</div>
            <div class="estadistica-label">Grupos</div>
          </div>
          
          <div class="estadistica-item">
            <div class="estadistica-valor">${estadisticas.horarios}</div>
            <div class="estadistica-label">Horarios</div>
          </div>
        </div>
        
        <h3>Estadísticas Detalladas</h3>
        
        <table class="reporte-tabla">
          <tbody>
            <tr>
              <td><strong>Total de Horas Asignadas:</strong></td>
              <td>${estadisticas.horasTotales} horas</td>
            </tr>
            <tr>
              <td><strong>Promedio de Horas por Docente:</strong></td>
              <td>${estadisticas.promedioHorasDocente} horas</td>
            </tr>
            <tr>
              <td><strong>Promedio de Asignaturas por Grupo:</strong></td>
              <td>${estadisticas.promedioAsignaturasGrupo} asignaturas</td>
            </tr>
            <tr>
              <td><strong>Total de Áreas:</strong></td>
              <td>${estadisticas.areas} áreas</td>
            </tr>
            <tr>
              <td><strong>Total de Grados:</strong></td>
              <td>${estadisticas.grados} grados</td>
            </tr>
            <tr>
              <td><strong>Total de Horarios Base:</strong></td>
              <td>${estadisticas.horariosBase} horarios base</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Distribución de Generaciones</h3>
        
        <table class="reporte-tabla">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Manual</td>
              <td>${estadisticas.tiposGeneracion.manual}</td>
              <td>${estadisticas.horarios > 0 ? Math.round((estadisticas.tiposGeneracion.manual / estadisticas.horarios) * 100) : 0}%</td>
            </tr>
            <tr>
              <td>Automática</td>
              <td>${estadisticas.tiposGeneracion.automatica}</td>
              <td>${estadisticas.horarios > 0 ? Math.round((estadisticas.tiposGeneracion.automatica / estadisticas.horarios) * 100) : 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Funciones de exportación e impresión de reportes
function exportarReporteCSV(tipo) {
  let csv = '';
  let nombreArchivo = `reporte_${tipo}_${new Date().toISOString().slice(0, 10)}.csv`;
  
  switch (tipo) {
    case 'docentes':
      csv = 'Nombre,Horas Asignadas,Horas Máximas,Ocupación,Restricciones,Director de Grupo\n';
      
      datos.docentes.forEach(docente => {
        const asignaciones = datos.asignaciones.filter(a => a.docente === docente.id);
        const horasTotales = asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
        
        let grupoDirector = 'No';
        if (docente.directorGrupo) {
          const grupo = datos.grupos.find(g => g.id === docente.directorGrupo);
          if (grupo) {
            const grado = datos.grados.find(g => g.id === grupo.grado);
            grupoDirector = `${grado?.nombre || ""} ${grupo.nombre}`;
          }
        }
        
        csv += `"${docente.nombre}",${horasTotales},${docente.maxHoras},${Math.round((horasTotales / docente.maxHoras) * 100)}%,${docente.restricciones.length},"${grupoDirector}"\n`;
      });
      break;
      
    case 'grupos':
      csv = 'Grupo,Grado,Director,Total Horas,Asignaturas\n';
      
      datos.grupos.forEach(grupo => {
        const grado = datos.grados.find(g => g.id === grupo.grado);
        const asignaciones = datos.asignaciones.filter(a => a.grupo === grupo.id);
        const director = datos.docentes.find(d => d.directorGrupo === grupo.id);
        const totalHoras = asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
        
        csv += `"${grado?.nombre || ""} ${grupo.nombre}","${grado?.nombre || "Sin grado"}","${director?.nombre || "Sin director"}",${totalHoras},${asignaciones.length}\n`;
      });
      break;
      
    case 'asignaturas':
      csv = 'ID,Nombre,Área,Total Horas,Grupos,Docentes\n';
      
      datos.asignaturas.forEach(asignatura => {
        const area = datos.areas.find(a => a.id === asignatura.area);
        const asignaciones = datos.asignaciones.filter(a => a.asignatura === asignatura.id);
        const totalHoras = asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
        const gruposIds = [...new Set(asignaciones.map(a => a.grupo))];
        const docentesIds = [...new Set(asignaciones.map(a => a.docente))];
        
        csv += `"${asignatura.identificador}","${asignatura.nombre}","${area?.nombre || "Sin área"}",${totalHoras},${gruposIds.length},${docentesIds.length}\n`;
      });
      break;
      
    case 'horarios':
      csv = 'Nombre,Fecha,Tipo,Horario Base,Grupos,Clases\n';
      
      datos.historial.forEach(generacion => {
        const gruposCount = generacion.horarios.length;
        const clasesCount = generacion.horarios.reduce((total, h) => total + h.clases.length, 0);
        
        csv += `"${generacion.nombre}","${new Date(generacion.fecha).toLocaleString()}","${generacion.tipo}","${generacion.horarioBase.nombre}",${gruposCount},${clasesCount}\n`;
      });
      break;
      
    case 'conflictos':
      csv = 'Generación,Fecha,Grupo,Tipo,Descripción\n';
      
      datos.historial.forEach(generacion => {
        generacion.horarios.forEach(horario => {
          const grupo = datos.grupos.find(g => g.id === horario.grupo);
          if (!grupo) return;
          
          const grado = datos.grados.find(g => g.id === grupo.grado);
          if (!grado) return;
          
          const conflictos = verificarConflictosHorario(horario);
          
          conflictos.forEach(conflicto => {
            csv += `"${generacion.nombre}","${new Date(generacion.fecha).toLocaleString()}","${grado?.nombre || ""} ${grupo.nombre}","${getTipoConflicto(conflicto.tipo)}","${conflicto.mensaje}"\n`;
          });
        });
      });
      break;
  }
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo;
  link.click();
}

function imprimirReporte(elementId) {
  const contenido = document.getElementById(elementId);
  if (!contenido) return;
  
  const printWindow = window.open('', '_blank');
  
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        console.log('Error al acceder a cssRules:', e);
        return '';
      }
    })
    .join('\n');
  
  printWindow.document.write(`
    <html>
    <head>
      <title>Reporte</title>
      <style>
        ${styles}
        
        @media print {
          body { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact; 
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          
          .reporte-acciones {
            display: none;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          
          th {
            background-color: #f2f2f2;
            color: black;
          }
          
          h2, h3, h4 {
            page-break-after: avoid;
          }
          
          tr {
            page-break-inside: avoid;
          }
          
          .docente-detalle, .grupo-detalle, .asignatura-detalle {
            page-break-inside: avoid;
            margin-bottom: 30px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
          }
        }
      </style>
    </head>
    <body>
      ${contenido.innerHTML}
      <script>
        window.onload = function() { 
          const actionButtons = document.querySelectorAll('.reporte-acciones');
          actionButtons.forEach(btn => btn.remove());
          
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        }
      </script>
    </body>
    </html>
  `);
  
  printWindow.document.close();
}

// =========================================
// DATOS - IMPORTACION Y EXPORTACION JSON
// =========================================

// importarDatosJSON
function importarDatosJSON() {
  // Crear input file oculto
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const datosImport = JSON.parse(event.target.result);
        
        // Verificar formato
        if (!datosImport.datos || !datosImport.version) {
          throw new Error('Formato de archivo inválido');
        }
        
        // Confirmar importación
        if (confirm('¿Está seguro de importar estos datos? Se reemplazarán todos los datos actuales.')) {
          // Reemplazar datos
          datos = datosImport.datos;
          
          // Guardar en localStorage
          guardarDatos();
          
          // Recargar datos en la interfaz
          cargarDatos();
          
          // Notificar al usuario
          agregarNotificacion(
            'success', 
            'Datos importados correctamente'
          );
        }
      } catch (error) {
        console.error('Error al importar datos:', error);
        
        // Notificar al usuario
        agregarNotificacion(
          'error', 
          'Error al importar datos: ' + error.message
        );
      }
    };
    
    reader.readAsText(file)
  };
  
  input.click()
}

// Reemplaza la función exportarDatosJSON
function exportarDatosJSON() {
  // Verificar si hay datos para exportar
  if (datos.docentes.length === 0 && datos.asignaturas.length === 0 && datos.grupos.length === 0) {
    notificarAdvertencia('No hay datos para exportar. Agregue al menos un docente, asignatura o grupo.');
    return;
  }
  
  // Confirmar exportación
  if (!confirm('¿Está seguro de exportar todos los datos?')) {
    return;
  }
  
  // Crear objeto con todos los datos
  const datosExport = {
    version: '1.0',
    fecha: new Date().toISOString(),
    datos: datos
  };
  
  // Convertir a JSON
  const jsonString = JSON.stringify(datosExport, null, 2);
  
  // Crear blob y descargar
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `eduplannerdata_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  
  // Notificar al usuario
  notificarExito('Datos exportados correctamente');
}

// =========================================
// COPIAS DE SEGURIDAD
// =========================================

// Reemplaza la función crearBackup
function crearBackup(mensaje = 'Backup creado correctamente') {
  // Verificar si hay datos para hacer backup
  if (datos.docentes.length === 0 && datos.asignaturas.length === 0 && datos.grupos.length === 0) {
    notificarAdvertencia('No hay datos para crear un backup. Agregue al menos un docente, asignatura o grupo.');
    return null;
  }
  
  // Confirmar creación de backup
  if (mensaje === 'Backup creado correctamente' && !confirm('¿Está seguro de crear un nuevo backup?')) {
    return null;
  }
  
  // Crear copia de los datos actuales
  const backup = {
    fecha: new Date().toISOString(),
    datos: JSON.parse(JSON.stringify(datos))
  };
  
  // Obtener backups existentes
  let backups = JSON.parse(localStorage.getItem('eduplannerBackups') || '[]');
  
  // Limitar a 10 backups
  if (backups.length >= 10) {
    backups = backups.slice(-9);
  }
  
  // Agregar nuevo backup
  backups.push(backup);
  
  // Guardar en localStorage
  localStorage.setItem('eduplannerBackups', JSON.stringify(backups));
  
  // Notificar al usuario
  notificarExito(mensaje);
  
  return backup;
}

// mostrarBackups
function mostrarBackups() {
  // Obtener backups existentes
  const backups = JSON.parse(localStorage.getItem('eduplannerBackups') || '[]');
  
  if (backups.length === 0) {
    agregarNotificacion(
      'info', 
      'No hay backups disponibles'
    );
    return
  }
  
  // Mostrar modal con lista de backups
  const modalTitulo = document.getElementById("modal-editar-titulo");
  const modalContenido = document.getElementById("modal-editar-contenido");
  const modalGuardar = document.getElementById("modal-editar-guardar");
  
  modalTitulo.textContent = 'Restaurar Backup';
  
  let html = `
    <div class="backups-container">
      <p>Seleccione un backup para restaurar:</p>
      <div class="backups-list">
  `;
  
  backups.forEach((backup, index) => {
    const fecha = new Date(backup.fecha).toLocaleString();
    html += `
      <div class="backup-item">
        <div class="backup-info">
          <div class="backup-fecha">${fecha}</div>
          <div class="backup-detalles">
            <span>Docentes: ${backup.datos.docentes.length}</span>
            <span>Asignaturas: ${backup.datos.asignaturas.length}</span>
            <span>Grupos: ${backup.datos.grupos.length}</span>
            <span>Horarios: ${backup.datos.historial.length}</span>
          </div>
        </div>
        <div class="backup-actions">
          <button class="btn btn-primary" onclick="restaurarBackup(${index})">Restaurar</button>
        </div>
      </div>
    `
  });
  
  html += `
      </div>
    </div>
  `;
  
  modalContenido.innerHTML = html;
  
  // Cambiar el botón de guardar por uno de cerrar
  modalGuardar.textContent = "Cerrar";
  modalGuardar.onclick = () => cerrarModal("modal-editar");
  
  // Mostrar modal
  document.getElementById("modal-editar").style.display = "block";
}

// restaurarBackup
function restaurarBackup(index) {
  // Obtener backups existentes
  const backups = JSON.parse(localStorage.getItem('eduplannerBackups') || '[]');
  
  if (index < 0 || index >= backups.length) {
    agregarNotificacion(
      'error', 
      'Backup no encontrado'
    );
    return;
  }
  
  // Confirmar restauración
  if (confirm('¿Está seguro de restaurar este backup? Se reemplazarán todos los datos actuales.')) {
    // Reemplazar datos
    datos = JSON.parse(JSON.stringify(backups[index].datos));
    
    // Guardar en localStorage
    guardarDatos();
    
    // Recargar datos en la interfaz
    cargarDatos();
    
    // Cerrar modal
    cerrarModal("modal-editar");
    
    // Notificar al usuario
    agregarNotificacion(
      'success', 
      'Backup restaurado correctamente'
    );
  }
}

// =========================================
// INICIALIZACIÓN DE SISTEMAS
// =========================================

function inicializarTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  if (tabButtons.length === 0) {
    console.warn("No se encontraron botones de tabs");
    return;
  }

  tabButtons.forEach(button => {
    button.addEventListener("click", function () {
      // Desactivar todos los botones
      tabButtons.forEach(btn => btn.classList.remove("active"));

      // Activar el botón seleccionado
      this.classList.add("active");

      // Ocultar todos los contenidos de tabs
      const tabPanes = document.querySelectorAll(".tab-pane");
      tabPanes.forEach(pane => pane.classList.remove("active"));

      // Mostrar el contenido seleccionado
      const tabId = this.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.add("active");
      }
    });
  });

  // Activar el primer botón por defecto si hay alguno
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add("active");

    const firstTabId = tabButtons[0].getAttribute("data-tab");
    const firstTabContent = document.getElementById(firstTabId);
    if (firstTabContent) {
      firstTabContent.classList.add("active");
    }
  }
}

function inicializarFiltros() {
  // Filtros de docentes
  const buscarDocente = document.getElementById("buscar-docente");
  if (buscarDocente) {
    buscarDocente.addEventListener("input", filtrarDocentes);
  }
  
  // Filtros de asignaturas
  const buscarAsignatura = document.getElementById("buscar-asignatura");
  const filtroArea = document.getElementById("filtro-area");
  if (buscarAsignatura) {
    buscarAsignatura.addEventListener("input", filtrarAsignaturas);
  }
  if (filtroArea) {
    filtroArea.addEventListener("change", filtrarAsignaturas);
  }
  
  // Filtros de grupos
  const buscarGrupo = document.getElementById("buscar-grupo");
  const filtroGrado = document.getElementById("filtro-grado");
  if (buscarGrupo) {
    buscarGrupo.addEventListener("input", filtrarGrupos);
  }
  if (filtroGrado) {
    filtroGrado.addEventListener("change", filtrarGrupos);
  }
}

function agregarEventosFormularios() {
  // Verificar si ya se agregaron los eventos
  if (document.querySelector('[data-eventos-agregados]')) return;
  
  // Marcar que se agregaron eventos
  document.body.setAttribute('data-eventos-agregados', 'true');
  
  // Docentes
  const formDocente = document.getElementById("form-nuevo-docente");
  if (formDocente) {
    formDocente.addEventListener("submit", agregarDocente);
  }

  // Asignaturas
  const formAsignatura = document.getElementById("form-nueva-asignatura");
  if (formAsignatura) {
    formAsignatura.addEventListener("submit", agregarAsignatura);
  }

  // Grupos
  const formGrupo = document.getElementById("form-nuevo-grupo");
  if (formGrupo) {
    formGrupo.addEventListener("submit", agregarGrupo);
  }

  // Grados
  const formGrado = document.getElementById("form-nuevo-grado");
  if (formGrado) {
    formGrado.addEventListener("submit", agregarGrado);
  }

  // Áreas
  const formArea = document.getElementById("form-nueva-area");
  if (formArea) {
    formArea.addEventListener("submit", agregarArea);
  }

  // Horarios Base
  const formHorarioBase = document.getElementById("form-nuevo-horario-base");
  if (formHorarioBase) {
    formHorarioBase.addEventListener("submit", agregarHorarioBase);
  }
}

function agregarBotonesAdicionales() {
  const quickActions = document.querySelector('.quick-actions .action-buttons');
  if (quickActions && !quickActions.querySelector('.backup-btn')) {
    // Botón de backup
    const backupBtn = document.createElement('button');
    backupBtn.className = 'action-btn backup-btn';
    backupBtn.onclick = crearBackup;
    backupBtn.innerHTML = `
      <div class="action-icon" style="background-color: #9b59b6;">
        <i class="fas fa-save"></i>
      </div>
      <div class="action-text">Crear Backup</div>
    `;
    quickActions.appendChild(backupBtn);
    
    // Botón de restaurar backup
    const restoreBtn = document.createElement('button');
    restoreBtn.className = 'action-btn restore-btn';
    restoreBtn.onclick = mostrarBackups;
    restoreBtn.innerHTML = `
      <div class="action-icon" style="background-color: #34495e;">
        <i class="fas fa-undo"></i>
      </div>
      <div class="action-text">Restaurar Backup</div>
    `;
    quickActions.appendChild(restoreBtn);
    
    // Botón de reportes
    const reportesBtn = document.createElement('button');
    reportesBtn.className = 'action-btn reportes-btn';
    reportesBtn.onclick = mostrarReportesPersonalizados;
    reportesBtn.innerHTML = `
      <div class="action-icon" style="background-color: #d35400;">
        <i class="fas fa-chart-pie"></i>
      </div>
      <div class="action-text">Reportes</div>
    `;
    quickActions.appendChild(reportesBtn);
  }
  
  // NO agregar botones al historial aquí - ya están en el HTML
}

// Reemplaza la función actualizarEstadisticas
function actualizarEstadisticas() {
  document.getElementById("total-docentes").textContent = datos.docentes.length;
  document.getElementById("total-asignaturas").textContent = datos.asignaturas.length;
  document.getElementById("total-grupos").textContent = datos.grupos.length;
  document.getElementById("total-horarios").textContent = datos.historial.length;

  // Actualizar progreso de asignaciones
  const totalAsignaciones = datos.asignaciones.length;
  document.getElementById("total-asignaciones").textContent = totalAsignaciones;

  // Calcular porcentaje de asignaciones completadas
  let porcentajeAsignaciones = 0;
  
  if (totalAsignaciones > 0) {
    // Verificar si todos los grupos tienen asignaciones completas
    const gruposIncompletos = verificarAsignacionesCompletas();
    
    // Calcular el total de asignaciones posibles (grupos * asignaturas aplicables)
    let totalPosibles = 0;
    datos.grupos.forEach(grupo => {
      const asignaturasAplicables = datos.asignaturas.filter(asignatura => {
        return asignatura.gradosHoras.some(gh => gh.grado === grupo.grado);
      });
      totalPosibles += asignaturasAplicables.length;
    });
    
    // Calcular porcentaje
    if (totalPosibles > 0) {
      porcentajeAsignaciones = Math.round((totalAsignaciones / totalPosibles) * 100);
    }
  }
  
  document.getElementById("asignaciones-progress").style.width = `${porcentajeAsignaciones}%`;
  document.getElementById("asignaciones-progress").textContent = `${porcentajeAsignaciones}%`;

  // Mostrar alerta si hay asignaciones incompletas
  const missingAssignmentsAlert = document.getElementById("missing-assignments-alert");
  if (missingAssignmentsAlert) {
    const gruposIncompletos = verificarAsignacionesCompletas();
    missingAssignmentsAlert.style.display = gruposIncompletos.length > 0 ? "flex" : "none";
  }

  // Actualizar horarios recientes
  const recentHorariosContainer = document.getElementById("recent-horarios");
  recentHorariosContainer.innerHTML = "";

  if (datos.historial.length > 0) {
    const recentHorarios = [...datos.historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5);
    
    recentHorarios.forEach((horario) => {
      const horarioItem = document.createElement("div");
      horarioItem.className = "recent-item";
      
      horarioItem.innerHTML = `
        <div class="recent-item-info">
          <div class="recent-item-title">${horario.nombre}</div>
          <div class="recent-item-meta">
            <span>${new Date(horario.fecha).toLocaleDateString()}</span> | 
            <span>${horario.tipo}</span>
          </div>
        </div>
        <div class="recent-item-actions">
          <a href="#" onclick="verHorarioDesdeHistorial('${horario.id}')"><i class="fas fa-eye"></i></a>
        </div>
      `;
      
      recentHorariosContainer.appendChild(horarioItem);
    });
  } else {
    recentHorariosContainer.innerHTML = '<p class="empty-state">No hay horarios generados recientemente</p>';
  }
  
  // Actualizar estadísticas adicionales si están disponibles
  const totalHorasElement = document.getElementById("total-horas");
  if (totalHorasElement) {
    const totalHoras = datos.asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
    totalHorasElement.textContent = totalHoras;
  }
  
  const promedioHorasDocenteElement = document.getElementById("promedio-horas-docente");
  if (promedioHorasDocenteElement && datos.docentes.length > 0) {
    const totalHoras = datos.asignaciones.reduce((total, a) => total + a.horasSemanales, 0);
    const promedio = Math.round(totalHoras / datos.docentes.length);
    promedioHorasDocenteElement.textContent = promedio;
  }
}

// Manejador de errores global
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Error en la aplicación: ", message, "en", source, "línea", lineno);
  return true;
};

// Cerrar modales al hacer clic en el botón de cerrar o fuera del modal
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Agregar estilos adicionales
  agregarEstilosAdicionales();
  agregarEstilosNotificaciones();
  verificarElementosCriticos();

  // Inicializar navegación PRIMERO
  inicializarNavegacion();
  reemplazarAlertsGlobalmente();

  // Cargar datos guardados
  cargarDatos();

  // Inicializar tabs DESPUÉS de cargar datos
  inicializarTabs();

  // Inicializar eventos de formularios
  inicializarEventosFormularios();

  // Actualizar estadísticas del dashboard
  actualizarEstadisticas();

  // Cargar datos predefinidos si no hay datos
  if (datos.docentes.length === 0 && datos.asignaturas.length === 0 && datos.grupos.length === 0) {
    cargarDatosPredefinidos();
  }

  // Verificar asignaciones completas
  verificarAsignacionesCompletas();
  
  // Inicializar modo oscuro
  inicializarModoOscuro();
  
  // Corregir IDs incorrectos
  corregirIdsIncorrectos();

  // AGREGAR EVENTOS A FORMULARIOS CORRECTAMENTE
  agregarEventosFormularios();

  // Agregar botones adicionales al panel de control
  agregarBotonesAdicionales();
});

document.querySelectorAll(".close").forEach(closeButton => {
  closeButton.addEventListener("click", function() {
    const modal = this.closest(".modal");
    if (modal) {
      modal.style.display = "none";
    }
  });
});

// =========================================
// NOTIFICACIONES MEJORADAS
// =========================================

// Sistema de notificaciones global
const notificaciones = {
  mostradas: [],
  contador: 0
};

// Función principal para agregar notificaciones
function agregarNotificacion(tipo, mensaje, accion = null, duracion = 5000) {
  const notificacion = {
    id: `notif-${Date.now()}-${++notificaciones.contador}`,
    tipo: tipo,
    mensaje: mensaje,
    accion: accion,
    duracion: duracion,
    timestamp: new Date()
  };
  
  mostrarNotificacion(notificacion);
}

// Función mejorada para mostrar notificaciones
function mostrarNotificacion(notificacion) {
  // Verificar si ya existe el contenedor de notificaciones
  let notificacionesContainer = document.getElementById('notificaciones-container');
  
  if (!notificacionesContainer) {
    notificacionesContainer = document.createElement('div');
    notificacionesContainer.id = 'notificaciones-container';
    notificacionesContainer.className = 'notificaciones-container';
    document.body.appendChild(notificacionesContainer);
  }
  
  // Crear elemento de notificación
  const notificacionElement = document.createElement('div');
  notificacionElement.className = `notificacion notificacion-${notificacion.tipo}`;
  notificacionElement.id = `notificacion-${notificacion.id}`;
  
  // Icono según tipo con animación
  let icono = '';
  let colorIcono = '';
  switch (notificacion.tipo) {
    case 'success': 
      icono = 'fas fa-check-circle'; 
      colorIcono = '#27ae60';
      break;
    case 'warning': 
      icono = 'fas fa-exclamation-triangle'; 
      colorIcono = '#f39c12';
      break;
    case 'error': 
      icono = 'fas fa-times-circle'; 
      colorIcono = '#e74c3c';
      break;
    case 'info':
    default: 
      icono = 'fas fa-info-circle';
      colorIcono = '#3498db';
  }
  
  // Contenido de la notificación con animaciones
  notificacionElement.innerHTML = `
    <div class="notificacion-barra-progreso">
      <div class="notificacion-progreso" style="animation-duration: ${notificacion.duracion}ms;"></div>
    </div>
    <div class="notificacion-contenido-wrapper">
      <div class="notificacion-icono" style="color: ${colorIcono};">
        <i class="${icono}"></i>
      </div>
      <div class="notificacion-contenido">
        <div class="notificacion-titulo">E-duplaner</div>
        <div class="notificacion-mensaje">${notificacion.mensaje}</div>
        ${notificacion.accion ? `
          <div class="notificacion-accion">
            <button class="notificacion-btn" onclick="${notificacion.accion.funcion}('${notificacion.id}')">
              ${notificacion.accion.texto}
            </button>
          </div>
        ` : ''}
      </div>
      <div class="notificacion-cerrar" onclick="cerrarNotificacion('${notificacion.id}')">
        <i class="fas fa-times"></i>
      </div>
    </div>
  `;
  
  // Agregar al contenedor con animación de entrada
  notificacionesContainer.appendChild(notificacionElement);
  
  // Trigger de animación de entrada
  setTimeout(() => {
    notificacionElement.classList.add('notificacion-visible');
  }, 10);
  
  // Agregar a la lista de mostradas
  notificaciones.mostradas.push(notificacion.id);
  
  // Auto-cerrar después de un tiempo (excepto errores)
  if (notificacion.tipo !== 'error' && notificacion.duracion > 0) {
    setTimeout(() => {
      cerrarNotificacion(notificacion.id);
    }, notificacion.duracion);
  }
  
  // Agregar eventos de hover para pausar/reanudar
  notificacionElement.addEventListener('mouseenter', () => {
    const progreso = notificacionElement.querySelector('.notificacion-progreso');
    if (progreso) {
      progreso.style.animationPlayState = 'paused';
    }
  });
  
  notificacionElement.addEventListener('mouseleave', () => {
    const progreso = notificacionElement.querySelector('.notificacion-progreso');
    if (progreso) {
      progreso.style.animationPlayState = 'running';
    }
  });
}

// Función para cerrar notificaciones con animación
function cerrarNotificacion(notificacionId) {
  const notificacionElement = document.getElementById(`notificacion-${notificacionId}`);
  
  if (notificacionElement) {
    // Agregar clase de salida
    notificacionElement.classList.add('notificacion-saliendo');
    
    // Remover después de la animación
    setTimeout(() => {
      if (notificacionElement && notificacionElement.parentNode) {
        notificacionElement.parentNode.removeChild(notificacionElement);
      }
      
      // Remover de la lista
      const index = notificaciones.mostradas.indexOf(notificacionId);
      if (index > -1) {
        notificaciones.mostradas.splice(index, 1);
      }
    }, 300);
  }
}

// Función para cerrar todas las notificaciones
function cerrarTodasLasNotificaciones() {
  const notificacionesContainer = document.getElementById('notificaciones-container');
  if (notificacionesContainer) {
    const notificacionesActivas = notificacionesContainer.querySelectorAll('.notificacion');
    notificacionesActivas.forEach(notif => {
      const id = notif.id.replace('notificacion-', '');
      cerrarNotificacion(id);
    });
  }
}

// Variable para controlar notificaciones
let ultimaNotificacion = { mensaje: '', timestamp: 0 };

function notificarExito(mensaje, duracion = 4000) {
  // Evitar duplicados
  const ahora = Date.now();
  if (ultimaNotificacion.mensaje === mensaje && (ahora - ultimaNotificacion.timestamp) < 1000) {
    return;
  }
  
  ultimaNotificacion = { mensaje, timestamp: ahora };
  agregarNotificacion('success', mensaje, null, duracion);
}

function notificarAdvertencia(mensaje, duracion = 6000) {
  const ahora = Date.now();
  if (ultimaNotificacion.mensaje === mensaje && (ahora - ultimaNotificacion.timestamp) < 1000) {
    return;
  }
  
  ultimaNotificacion = { mensaje, timestamp: ahora };
  agregarNotificacion('warning', mensaje, null, duracion);
}

function notificarError(mensaje, duracion = 0) {
  const ahora = Date.now();
  if (ultimaNotificacion.mensaje === mensaje && (ahora - ultimaNotificacion.timestamp) < 1000) {
    return;
  }
  
  ultimaNotificacion = { mensaje, timestamp: ahora };
  agregarNotificacion('error', mensaje, null, duracion);
}

function notificarInfo(mensaje, duracion = 5000) {
  const ahora = Date.now();
  if (ultimaNotificacion.mensaje === mensaje && (ahora - ultimaNotificacion.timestamp) < 1000) {
    return;
  }
  
  ultimaNotificacion = { mensaje, timestamp: ahora };
  agregarNotificacion('info', mensaje, null, duracion);
}

// Función para notificaciones con acción
function confirmarAccion(mensaje, callback) {
  const modalTitulo = document.getElementById("modal-titulo");
  const modalMensaje = document.getElementById("modal-mensaje");
  const modalConfirmar = document.getElementById("modal-confirmar");
  
  modalTitulo.textContent = "Confirmar Acción";
  modalMensaje.textContent = mensaje;
  modalConfirmar.onclick = () => {
    callback();
    cerrarModal("modal-confirmacion");
  };
  
  document.getElementById("modal-confirmacion").style.display = "block";
}

function reemplazarAlertsGlobalmente() {
  // Sobrescribir alert global
  window.alert = function(mensaje) {
    notificarInfo(mensaje);
  };
  
  // Sobrescribir confirm global
  window.confirm = function(mensaje) {
    return new Promise((resolve) => {
      confirmarAccion(mensaje, () => resolve(true));
    });
  };
}
