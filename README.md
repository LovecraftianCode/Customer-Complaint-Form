# Customer Complaint Form - Formulario de Quejas

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

> **Formulario de quejas para servicio al cliente** con validación en tiempo real, feedback visual y manejo de grupos de checkboxes y radio buttons.  
> *¡Cada campo validado al instante con colores verde/rojo!*

## Demo en vivo

<!-- ⚠️ Reemplaza esta imagen con una captura de tu formulario funcionando -->
<img width="392" height="685" alt="form" src="https://github.com/user-attachments/assets/908d9345-83bb-4f6e-b39f-508ce43fb1f6" />

<a href="https://lovecraftiancode.github.io/Customer-Complaint-Form/" target="_blank">**¡Haz click aqui para probarlo!** </a>

## Tabla de Contenidos
- [Sobre este proyecto](#sobre-este-proyecto)
- [Características del formulario](#características-del-formulario)
- [Reglas de validación](#reglas-de-validación)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Conceptos aprendidos](#conceptos-aprendidos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Explicación del código](#explicación-del-código)
- [Cómo ejecutar localmente](#cómo-ejecutar-localmente)
- [Próximas mejoras](#próximas-mejoras)
- [Autor](#autor)

## Sobre este proyecto

Este proyecto es un **formulario de quejas para servicio al cliente** con validación completa en tiempo real. El código base y la lógica fundamental fueron desarrollados siguiendo los ejercicios de **freeCodeCamp**. A partir de esa base, he añadido mejoras como:

- **Validación en tiempo real** con feedback visual (bordes verdes/rojos)
- **Contador de caracteres** para las descripciones
- **Botón de limpiar formulario** con confirmación
- **Diseño responsive** con gradientes modernos
- **Validación condicional** (descripciones solo cuando "Other" está seleccionado)

**Objetivo:** Crear un formulario completamente funcional y validado sin usar frameworks ni librerías externas, solo JavaScript puro, CSS3 y HTML5.

## Características del formulario

| Característica | Descripción |
|----------------|-------------|
| **Validación en tiempo real** | Bordes verdes/rojos mientras el usuario escribe |
| **Contador de caracteres** | Muestra progreso 0/20 para descripciones |
| **Feedback visual** | Mensajes de éxito/error en tiempo real |
| **Botón Clear Form** | Reinicia todos los campos y estilos |
| **Grupos de checkboxes** | Valida que al menos uno esté marcado |
| **Grupos de radio buttons** | Valida que al menos uno esté seleccionado |
| **Validación condicional** | Descripciones requieren 20+ chars solo si "Other" |
| **Diseño responsive** | Funciona en PC, tablet y móvil |
| **Consola detallada** | Muestra el objeto de validación al enviar |

## Reglas de validación

| Campo | Regla | Ejemplo válido | Feedback visual |
|-------|-------|----------------|-----------------|
| **Full Name** | No vacío | `Juan Pérez` | 🟢 Verde / 🔴 Rojo |
| **Email** | Formato válido + caracteres seguros | `juan@email.com` | 🟢 Verde / 🔴 Rojo |
| **Order No** | 10 dígitos empezando con 2024 | `2024123456` | 🟢 Verde / 🔴 Rojo |
| **Product Code** | Patrón `XX##-X###-XX#` | `AB12-C345-DE6` | 🟢 Verde / 🔴 Rojo |
| **Quantity** | Número entero positivo | `5` | 🟢 Verde / 🔴 Rojo |
| **Complaint Reason** | Al menos un checkbox | ☑ Damaged Product | 🟢 Verde / 🔴 Rojo |
| **Complaint Description** | 20+ chars SOLO si "Other" | `Producto llegó roto en la caja...` | 🟢 Verde / 🔴 Rojo |
| **Desired Solution** | Al menos un radio | ● Refund | 🟢 Verde / 🔴 Rojo |
| **Solution Description** | 20+ chars SOLO si "Other" | `Me gustaría un reembolso completo...` | 🟢 Verde / 🔴 Rojo |

## Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura semántica del formulario |
| **CSS3** | Estilos modernos, gradientes, flexbox, responsive |
| **JavaScript ES6+** | Validación, manipulación del DOM, eventos, regex |
| **Git & GitHub Pages** | Control de versiones y despliegue |

## Conceptos aprendidos

### Validación de email con Regex
```javascript
function validateEmail() {
  const emailRegex = /^[^\s@<>{}[\]\\/`~!@#$%^&*()+=,;:'"?|]+@[^\s@<>]+\.([^\s@<>]+)$/i;
  return emailRegex.test(emailInput.value);
}
```

### Validación de código de producto
```javascript
function validateProductCode() {
  const productCodeRegex = /^[A-Za-z]{2}\d{2}-[A-Za-z]{1}\d{3}-[A-Za-z]{2}\d{1}$/;
  return productCodeRegex.test(productCode.value);
}
```

### Feedback visual en tiempo real
```javascript
function setFieldStyle(field, isValid) {
  if (isValid) {
    field.style.border = '2px solid green';
  } else {
    field.style.border = '2px solid red';
  }
}

// Eventos 'input' para validar mientras escribe
noEmptyName.addEventListener('input', () => {
  setFieldStyle(noEmptyName, validateName());
});
```

### Validación de grupos de checkboxes
```javascript
function isAtLeastOneCheckboxChecked() {
  const checkboxes = document.querySelectorAll('#complaints-group input[type="checkbox"]');
  for (const checkbox of checkboxes) {
    if (checkbox.checked) return true;
  }
  return false;
}
```

### Validación condicional 
```javascript
function complaintDescription() {
  const otherCheckbox = document.getElementById("other-complaint");
  const descriptionInput = document.getElementById("complaint-description");
  
  if (!otherCheckbox.checked) return true;  // No requerido
  return descriptionInput.value.length >= 20;  // Requiere 20+ chars
}
```

### Contador de caracteres
```javascript
function addCharCounter(textareaId, minLength) {
  const textarea = document.getElementById(textareaId);
  const counter = document.createElement('small');
  textarea.parentNode.insertBefore(counter, textarea.nextSibling);
  
  textarea.addEventListener('input', () => {
    const length = textarea.value.length;
    counter.textContent = `${length}/${minLength} caracteres mínimos`;
    counter.style.color = length >= minLength ? 'green' : 'red';
  });
}
```

### Objeto de validación global
```javascript
function validateForm() {
  return {
    "full-name": validateName(),
    "email": validateEmail(),
    "order-no": validateOrderNumber(),
    "product-code": validateProductCode(),
    "quantity": validateQuantity(),
    "complaints-group": isAtLeastOneCheckboxChecked(),
    "complaint-description": complaintDescription(),
    "solutions-group": isatLeastOneRadioChecked(),
    "solution-description": solutionDescription()
  };
}

function isValid(validationObject) {
  return Object.values(validationObject).every(value => value === true);
}
```

### Botón de limpiar formulario
```javascript
function addClearButton() {
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Form';
  clearBtn.id = 'clear-btn';
  clearBtn.onclick = () => {
    if (confirm('¿Borrar todos los datos del formulario?')) {
      document.getElementById('form').reset();
      // Resetear estilos de todos los campos
      document.querySelectorAll('input, textarea').forEach(resetFieldStyle);
      document.querySelectorAll('fieldset').forEach(resetFieldsetStyle);
    }
  };
  btnContainer.appendChild(clearBtn);
}
```

## Estructura del proyecto
```bash
customer-complaint-form/
│
├── README.md                 # Documentación del proyecto
├── index.html                # Estructura HTML del formulario
├── styles.css                # Estilos CSS y responsive design
└── script.js                 # Lógica completa de validación
```

## Explicación del código

### Variables principales

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `noEmptyName` | Element | Input de nombre completo |
| `emailInput` | Element | Input de email |
| `ordeNombInp` | Element | Input de número de orden |
| `productCode` | Element | Input de código de producto |
| `quantityInput` | Element | Input de cantidad |

### Eventos soportados

| Evento | Elementos | Función |
|--------|-----------|---------|
| `change` | Todos los inputs | Validación al salir del campo |
| `input` | Textos y textareas | Validación en tiempo real mientras escribe |
| `change` | Checkboxes/Radios | Validación de grupos |
| `submit` | Formulario | Validación final y envío |
| `click` | Clear Button | Limpiar todo el formulario |

### Conceptos clave aplicados

| Concepto | Implementación |
|----------|----------------|
| Manipulación del DOM | `getElementById`, `querySelectorAll` |
| Expresiones Regulares | Validación de email, orden y código |
| Eventos de formulario | `change`, `input`, `submit` |
| Feedback visual | Estilos dinámicos con `style.border` |
| Validación de grupos | Iteración sobre checkboxes/radios |
| Validación condicional | Lógica condicional con checkbox "Other" |
| Arrays y objetos | `validateForm()` retorna objeto con estados |
| `preventDefault()` | Evita recarga al enviar |
| `confirm()` | Confirmación antes de limpiar |

## Cómo ejecutar localmente

Requisitos:

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Opcional: VS Code con Live Server

```bash
# 1. Clonar el repositorio
git clone https://github.com/LovecraftianCode/Customer-Complaint-Form.git
cd customer-complaint-form

# 2. Opción A: Abrir directamente
# Haz doble clic en index.html

# 3. Opción B: Con Live Server (recomendado)
npx live-server

# 4. ¡Prueba el formulario!
```

## Próximas mejoras

- Guardar datos en localStorage - Persistencia del formulario
- Envío a backend - Integración con API real
- Modo oscuro/claro - Toggle de tema
- Internacionalización - Soporte para múltiples idiomas
- Accesibilidad mejorada - Atributos ARIA completos
- Validación de email en tiempo real - Verificar dominio existente
- Máscaras de entrada - Para número de orden y código de producto
- Exportar datos - Generar PDF/JSON con la queja

## Autor 
Humberto Isaac Padilla Contreras - @LovecraftianCode

