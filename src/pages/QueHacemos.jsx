import React from 'react';
import { AlertCircle, Target, ShieldCheck, ArrowRightCircle, Layers, Workflow, Settings } from 'lucide-react';
import content from '../content.json';
import './QueHacemos.css';

const QueHacemos = () => {
  const { queHacemos } = content;

  return (
    <div className="qh-page-container">
      {/* SECCIÓN INTRODUCCIÓN */}
      <section className="qh-hero">
        <div className="container-general">
          <span className="qh-tag">Propuesta de Valor</span>
          <h1>{queHacemos.intro.title}</h1>
          <p className="qh-description">{queHacemos.intro.text}</p>
        </div>
      </section>

      {/* SECCIÓN PROBLEMAS QUE RESOLVEMOS */}
      <section className="qh-problems">
        <div className="container-general">
          <div className="qh-section-header">
            <AlertCircle className="icon-accent" size={32} />
            <h2>¿Qué problemas resolvemos?</h2>
          </div>
          <div className="problems-grid">
            {queHacemos.problemas.map((prob) => (
              <div key={prob.id} className="problem-card">
                <Settings className="problem-icon" size={24} />
                <div className="problem-info">
                  <h3>{prob.label}</h3>
                  <p>{prob.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN CLIENTE OBJETIVO */}
      <section className="qh-target">
        <div className="container-general">
          <div className="target-card">
            <div className="target-icon-box">
              <Target size={48} />
            </div>
            <div className="target-text">
              <h2>Para quién existe VisualCore</h2>
              <p>
                Empresas medianas y grandes que operan <strong>sistemas críticos</strong> y valoran la 
                estabilidad, escalabilidad y seguridad. Nuestro enfoque está en clientes que buscan &amp;
                <strong>respaldo técnico senior</strong> por sobre la experimentación inmadura.
              </p>
              <div className="target-features">
                <span><ShieldCheck size={16} /> Experiencia Corporativa</span>
                <span><ShieldCheck size={16} /> Continuidad Operativa</span>
                <span><ShieldCheck size={16} /> Visión Integral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PILARES DE SERVICIO */}
      <section className="qh-pillars">
        <div className="container-general">
          <div className="pillars-grid">
            {queHacemos.pilares.map((pilar, index) => (
              <div key={index} className="pilar-item">
                <div className="pilar-header">
                  <Layers size={24} className="pilar-icon" />
                  <h4>{pilar.title}</h4>
                </div>
                <ul className="pilar-list">
                  {pilar.items.map((item, i) => (
                    <li key={i}>
                      <ArrowRightCircle size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER DE POSICIONAMIENTO */}
      <section className="qh-statement">
        <div className="container-general">
          <div className="statement-box">
            <Workflow size={40} />
            <p>
              Construimos soluciones digitales completas, con foco en el 
              <strong> núcleo técnico</strong> que garantiza la escalabilidad y el éxito del negocio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueHacemos;