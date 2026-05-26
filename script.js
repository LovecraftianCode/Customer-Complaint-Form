const noEmptyName = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const ordeNombInp= document.getElementById("order-no");
const productCode= document.getElementById("product-code");
const quantityInput = document.getElementById("quantity");

function validateName() {
  if (noEmptyName.value === "") {
    return false;
  }
    return true;
}

function validateEmail() {
  const emailRegex = /^[^\s@<>{}[\]\\/`~!@#$%^&*()+=,;:'"?|]+@[^\s@<>]+\.([^\s@<>]+)$/i;
  if (!emailRegex.test(emailInput.value)) {
    return false;
  }
  return true;
}

function validateOrderNumber() {
  const orderNumberRegex = /^2024\d{6}$/;// El número de orden debe ser exactamente 10 dígitos
  if (!orderNumberRegex.test(ordeNombInp.value)) {
    return false;
  }
  return true;
}

function validateProductCode() {
  const productCodeRegex = /^[A-Za-z]{2}\d{2}-[A-Za-z]{1}\d{3}-[A-Za-z]{2}\d{1}$/;
  if (!productCodeRegex.test(productCode.value)) {
    return false;
  }
  return true;
}

function validateQuantity() {
  if (quantityInput.value === "" || isNaN(quantityInput.value) || parseInt(quantityInput.value) <= 0) {
    return false;
  }
  return true;
}

function isAtLeastOneCheckboxChecked() {

  const checkboxes = document.querySelectorAll('#complaints-group input[type="checkbox"]');//Selecciona todos los checkboxes dentro del fieldset con id "complaints-group"
  
  // Verificar si al menos uno está checked
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      return true;  // Encontró uno marcado
    }
  }
  
  return false;  // Ninguno está marcado
}

function complaintDescription() {
  const descriptionInput = document.getElementById("complaint-description");
  const otherCheckbox = document.getElementById("other-complaint");
  if (otherCheckbox.checked) {
    if (descriptionInput.value.length < 20) {
      return false; // La descripción es demasiado corta
    }
  }
  return true; // La descripción es válida o el checkbox "Other" no está marcado
}

function isatLeastOneRadioChecked() {
  const radios = document.querySelectorAll('input[name="solutions"]'); //Selecciona todos los radio buttons con el nombre "solutions"
  for (const radio of radios) {
    if (radio.checked) {
      return true; // Encontró uno marcado
    }
  }
  return false; // Ninguno está marcado
}

function solutionDescription() {
  const descriptionInput = document.getElementById("solution-description");
  const otherRadio = document.getElementById("other-solution");
  if (otherRadio.checked) {
    if (descriptionInput.value.length < 20) {
      return false; // La descripción es demasiado corta
    }
  }
  return true; // La descripción es válida o el radio "Other" no está marcado
}

function validateForm() {
  // Llamar a cada función de validación y almacenar los resultados en un objeto
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

function isValid(validateForm) {
  for (const [key, value] of Object.entries(validateForm)) {
    if (value === false) {
      return false; // Si alguna validación es false, el formulario no es válido
    }
  }
  return true; // Todas las validaciones son true, el formulario es válido
}

// Función para aplicar estilo a un campo individual
function setFieldStyle(field, isValid) {
  if (isValid) {
    field.style.border = '2px solid green';
    field.style.outline = 'none';// Elimina el borde rojo si antes estaba marcado como inválido
  } else {
    field.style.border = '2px solid red';
    field.style.outline = 'none';// Elimina el borde verde si antes estaba marcado como válido
  }
}

// Función para aplicar estilo a un fieldset (para checkboxes y radios)
function setFieldsetStyle(fieldset, isValid) {
  if (isValid) {
    fieldset.style.border = '2px solid green';
    fieldset.style.borderRadius = '5px';
  } else {
    fieldset.style.border = '2px solid red';
    fieldset.style.borderRadius = '5px';
  }
}

// Función para resetear estilos 
function resetFieldStyle(field) {
  field.style.border = '';
  field.style.outline = '';
}

function resetFieldsetStyle(fieldset) {
  fieldset.style.border = '';
  fieldset.style.borderRadius = '';
}

// ============ MANEJADORES DE EVENTOS ============

// Nombre completo
function handleNameChange() {
  const isValid = validateName();
  setFieldStyle(noEmptyName, isValid);
  return isValid;
}

// Email
function handleEmailChange() {
  const isValid = validateEmail();
  setFieldStyle(emailInput, isValid);
  return isValid;
}

// Número de orden
function handleOrderChange() {
  const isValid = validateOrderNumber();
  setFieldStyle(ordeNombInp, isValid);
  return isValid;
}

// Código de producto
function handleProductCodeChange() {
  const isValid = validateProductCode();
  setFieldStyle(productCode, isValid);
  return isValid;
}

// Cantidad
function handleQuantityChange() {
  const isValid = validateQuantity();
  setFieldStyle(quantityInput, isValid);
  return isValid;
}

// Grupo de checkboxes (complaints)
function handleComplaintsGroupChange() {
  const isValid = isAtLeastOneCheckboxChecked();// Valida el grupo de quejas
  const fieldset = document.getElementById('complaints-group');
  setFieldsetStyle(fieldset, isValid);
  return isValid;
}

// Descripción de queja (textarea)
function handleComplaintDescriptionChange() {
  const isValid = complaintDescription();// Valida la descripción de queja
  const textarea = document.getElementById('complaint-description');
  setFieldStyle(textarea, isValid);
  return isValid;
}

// 8. Grupo de radios (solutions)
function handleSolutionsGroupChange() {
  const isValid = isatLeastOneRadioChecked();// Valida el grupo de soluciones
  const fieldset = document.getElementById('solutions-group');// Obtiene el fieldset del grupo de soluciones
  setFieldsetStyle(fieldset, isValid);
  return isValid;
}

// Descripción de solución (textarea)
function handleSolutionDescriptionChange() {
  const isValid = solutionDescription();
  const textarea = document.getElementById('solution-description');
  setFieldStyle(textarea, isValid);
  return isValid;
}

// ============ ASIGNAR EVENT LISTENERS ============

// Campos individuales
noEmptyName.addEventListener('change', handleNameChange);
emailInput.addEventListener('change', handleEmailChange);
ordeNombInp.addEventListener('change', handleOrderChange);
productCode.addEventListener('change', handleProductCodeChange);
quantityInput.addEventListener('change', handleQuantityChange);

// Textareas
const complaintTextarea = document.getElementById('complaint-description');
const solutionTextarea = document.getElementById('solution-description');
complaintTextarea.addEventListener('change', handleComplaintDescriptionChange);
solutionTextarea.addEventListener('change', handleSolutionDescriptionChange);

// Checkboxes del grupo de quejas (cada uno dispara la validación del grupo)
const checkboxes = document.querySelectorAll('#complaints-group input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleComplaintsGroupChange);
});

// Radios del grupo de soluciones
const radios = document.querySelectorAll('input[name="solutions"]');
radios.forEach(radio => {
  radio.addEventListener('change', handleSolutionsGroupChange);
});

// Caso especial: "Other" checkbox también afecta la validación de la descripción
const otherCheckbox = document.getElementById('other-complaint');
otherCheckbox.addEventListener('change', () => {
  handleComplaintDescriptionChange();  // Valida la descripción
  handleComplaintsGroupChange();       // Valida el grupo completo
});

// Caso especial: "Other" radio también afecta la validación de la descripción
const otherRadio = document.getElementById('other-solution');
otherRadio.addEventListener('change', () => {
  handleSolutionDescriptionChange();  // Valida la descripción
  handleSolutionsGroupChange();       // Valida el grupo completo
});

// También escuchar eventos 'input' para feedback en tiempo real (mientras escribe)
complaintTextarea.addEventListener('input', handleComplaintDescriptionChange);
solutionTextarea.addEventListener('input', handleSolutionDescriptionChange);
noEmptyName.addEventListener('input', handleNameChange);
emailInput.addEventListener('input', handleEmailChange);
ordeNombInp.addEventListener('input', handleOrderChange);
productCode.addEventListener('input', handleProductCodeChange);
quantityInput.addEventListener('input', handleQuantityChange);

// Función principal que maneja el envío del formulario
function handleSubmit(event) {
  // Prevenir que el formulario se envíe (evita recargar la página)
  event.preventDefault();
  
  // Obtener el objeto de validación
  const validationResult = validateForm();
  
  // Mostrar el objeto de validación en la consola
  console.log("=== RESULTADO DE VALIDACIÓN ===");
  console.log(validationResult);
  console.log("================================");
  
  // Verificar si el formulario es válido
  const formIsValid = isValid(validationResult);
  
  // Mostrar mensaje al usuario
  const messageBox = document.getElementById("message-box");
  
  if (formIsValid) {
    console.log("Formulario válido - Enviando datos...");
    messageBox.textContent = "Formulario enviado correctamente. ¡Gracias por tu reporte!";
    messageBox.style.color = "green";
    
    // Aquí puedes enviar el formulario realmente:
    // event.target.submit(); // Descomenta si quieres enviar al servidor
    
    // Opcional: Resetear el formulario después de envío exitoso
    // event.target.reset();
  } else {
    console.log("Formulario inválido - Corregir errores");
    messageBox.textContent = "Por favor corrige los errores en el formulario";
    messageBox.style.color = "red";
    
    // Opcional: Mostrar qué campos están mal
    const errors = [];
    if (!validationResult["full-name"]) errors.push("Nombre completo");
    if (!validationResult["email"]) errors.push("Email");
    if (!validationResult["order-no"]) errors.push("Número de orden");
    if (!validationResult["product-code"]) errors.push("Código de producto");
    if (!validationResult["quantity"]) errors.push("Cantidad");
    if (!validationResult["complaints-group"]) errors.push("Motivo de queja");
    if (!validationResult["complaint-description"]) errors.push("Descripción de queja");
    if (!validationResult["solutions-group"]) errors.push("Solución deseada");
    if (!validationResult["solution-description"]) errors.push("Descripción de solución");
    
    if (errors.length > 0) {
      console.log("Campos con error:", errors.join(", "));
    }
  }
  
  return formIsValid;
}

// Contador de caracteres para textareas
function addCharCounter(textareaId, maxLength) {
    const textarea = document.getElementById(textareaId);
    const counter = document.createElement('small');
    counter.style.display = 'block';
    counter.style.textAlign = 'right';
    counter.style.color = '#666';
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);
    
    function updateCounter() {
        const length = textarea.value.length;
        counter.textContent = `${length}/20 caracteres mínimos`;
        if (length < 20 && length > 0) {
            counter.style.color = 'red';
        } else if (length >= 20) {
            counter.style.color = 'green';
        } else {
            counter.style.color = '#666';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

// Inicializar contadores
addCharCounter('complaint-description', 20);
addCharCounter('solution-description', 20);

// Boton para limpiar formulario
function addClearButton() {
    const btnContainer = document.getElementById('btn-container');
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear Form';
    clearBtn.id = 'clear-btn';
    clearBtn.type = 'button';
    clearBtn.onclick = () => {
        if (confirm('¿Borrar todos los datos del formulario?')) {
            document.getElementById('form').reset();
            // Resetear estilos también
            const allInputs = document.querySelectorAll('input, textarea');
            allInputs.forEach(input => resetFieldStyle(input));
            const allFieldsets = document.querySelectorAll('fieldset');
            allFieldsets.forEach(fieldset => resetFieldsetStyle(fieldset));
            document.getElementById('message-box').textContent = '';
        }
    };
    btnContainer.appendChild(clearBtn);
}

addClearButton();
const form = document.getElementById("form");

// Agregar el event listener para el envío
form.addEventListener("submit", handleSubmit);