import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { X } from 'lucide-react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: {
      codigoPais: '',
      prefijo: '',
      numero: ''
    },
    empresa: '',
    descripcion: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.nombre) tempErrors.nombre = "El nombre es obligatorio";
    if (!emailRegex.test(formData.email)) tempErrors.email = "Email inválido";
    if (formData.telefono.length < 10) tempErrors.telefono = "Teléfono incompleto";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Datos enviados:", formData);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* CABECERA FIJA */}
        <div className="modal-header">
          <h2>Contáctenos</h2>
          <button className="close-fixed-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <p>Déjanos tus datos y nos pondremos en contacto a la brevedad.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              {errors.nombre && <span className="error">{errors.nombre}</span>}
            </div>

            <div className="input-group">
              <label>Email Corporativo</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label>Teléfono</label>
                <PhoneInput
                  country={'cl'}
                  value={formData.telefono.codigoPais + formData.telefono.prefijo + formData.telefono.numero}
                  onChange={(value, country, e, formattedValue) => {
                    // La librería nos da 'country' que contiene el dialCode
                    const dialCode = country.dialCode;
                    const phoneNumber = value.slice(dialCode.length); // El resto es el número + prefijo

                    setFormData({
                      ...formData,
                      telefono: {
                        codigoPais: dialCode,
                        prefijo: country.areaCode || "", // Algunos países tienen área, otros no
                        numero: phoneNumber.replace(country.areaCode, "") // Limpiamos el número
                      }
                    });
                  }}
                  inputStyle={{ width: '100%' }}
                />
              {errors.telefono && <span className="error">{errors.telefono}</span>}
            </div>

            <div className="input-group">
              <label>Nombre Empresa</label>
              <input 
                type="text" 
                value={formData.empresa}
                onChange={(e) => setFormData({...formData, empresa: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>Descripción del Proyecto</label>
              <textarea 
                rows="4"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              ></textarea>
            </div>

            {/* BOTONES EN FILA */}
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-submit">
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;