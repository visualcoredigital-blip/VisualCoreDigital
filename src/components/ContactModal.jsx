import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { X, CheckCircle } from 'lucide-react';
import './ContactModal.css';
import { API_BASE_URL } from '../config/api';

const ContactModal = ({ isOpen, onClose }) => {
  const initialFormState = {
    nombre: '',
    email: '',
    telefono: { codigoPais: '', numero: '', formateado: '' },
    empresa: '',
    descripcion: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.nombre.trim()) tempErrors.nombre = "El nombre es obligatorio";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Email corporativo inválido";
    
    if (!formData.telefono.numero || formData.telefono.numero.length < 5) {
      tempErrors.telefono = "Número de teléfono incompleto";
    }
    
    if (!formData.descripcion.trim()) tempErrors.descripcion = "Cuéntanos brevemente sobre tu proyecto";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Petición al Backend dockerizado (localhost porque el navegador está fuera del contenedor)
      const response = await fetch(`${API_BASE_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ÉXITO: Mostramos feedback visual
        setShowSuccess(true);
        setFormData(initialFormState);
        
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2500);
      } else {
        // ERROR CONTROLADO: (Ej: Bloqueo por Spam/Rate Limit o error de validación del server)
        // Buscamos el mensaje en 'data.error' o 'data.message' según como responda el backend
        const errorMsg = data.error || data.message || "Hubo un error al procesar tu solicitud.";
        alert(errorMsg);
      }
    } catch (error) {
      // ERROR DE RED: (Ej: El contenedor de backend está apagado)
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Verifica que los servicios de Docker estén activos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Contáctenos</h2>
          <button 
            className="close-fixed-button" 
            onClick={onClose} 
            disabled={isSubmitting}
            title="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {showSuccess ? (
            <div className="success-message">
              <CheckCircle size={60} color="#22c55e" />
              <h3>¡Mensaje Enviado!</h3>
              <p>Gracias por contactar a <strong>Visual Core Digital</strong>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  disabled={isSubmitting}
                />
                {errors.nombre && <span className="error">{errors.nombre}</span>}
              </div>

              <div className="input-group">
                <label>Email Corporativo</label>
                <input 
                  type="email" 
                  placeholder="juan.perez@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label>Teléfono de Contacto</label>
                <PhoneInput
                  country={'cl'}
                  value={formData.telefono.formateado || formData.telefono.codigoPais + formData.telefono.numero}
                  onChange={(value, country, e, formattedValue) => {
                    const dialCode = country.dialCode;
                    const pureNumber = value.slice(dialCode.length);
                    
                    setFormData({
                      ...formData,
                      telefono: {
                        codigoPais: dialCode,
                        numero: pureNumber,
                        formateado: formattedValue 
                      }
                    });
                  }}
                  inputStyle={{ width: '100%', borderRadius: '8px', height: '45px' }}
                  disabled={isSubmitting}
                />
                {errors.telefono && <span className="error">{errors.telefono}</span>}
              </div>

              <div className="input-group">
                <label>Empresa (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="Nombre de tu organización"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>

              <div className="input-group">
                <label>Descripción del Proyecto / Requerimiento</label>
                <textarea 
                  rows="4"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  disabled={isSubmitting}
                ></textarea>
                {errors.descripcion && <span className="error">{errors.descripcion}</span>}
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;