import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ModelViewer } from '../src/components/ModelViewer';
import { MACHINES, formatDate, statusText } from './machines';
import './styles.css';

function Page() {
  const [id, setId] = useState<(typeof MACHINES)[number]['id']>('lrv');
  const m = MACHINES.find((x) => x.id === id)!;

  return (
    <main className="page">
      <header className="page__head">
        <p className="page__eyebrow">Abandoned but Not Forgotten · Role 2 · 3D viewer</p>
        <h1 className="page__title">
          <span className="page__num">01</span> Meet the machine
        </h1>
        <div className="tabs" role="group" aria-label="Choose a machine">
          {MACHINES.map((x) => (
            <button key={x.id} type="button" className="tab" aria-pressed={id === x.id} onClick={() => setId(x.id)}>
              {x.tab}
            </button>
          ))}
        </div>
      </header>

      {/* key: a fresh viewer for each machine, so one model never lingers behind the next */}
      <ModelViewer
        key={m.id}
        layout="split"
        modelPath={`/models/${m.id}.glb`}
        fallbackSrc={`/fallback/${m.id}.svg`}
        alt={m.alt}
        hotspots={m.hotspots}
        setting={m.setting}
      />

      <dl className="facts">
        <div className="fact">
          <dt>Name</dt>
          <dd>{m.name}</dd>
        </div>
        <div className="fact">
          <dt>Arrived</dt>
          <dd>
            <time dateTime={m.date}>{formatDate(m.date)}</time>
          </dd>
        </div>
        <div className="fact">
          <dt>Where</dt>
          <dd>{m.location}</dd>
        </div>
        <div className="fact">
          <dt>Job</dt>
          <dd>{m.job}</dd>
        </div>
        <div className="fact">
          <dt>Status</dt>
          <dd>
            <span className="status">{statusText(m.status)}</span>
          </dd>
        </div>
      </dl>

      <p className="credit">
        <b>Model credit.</b> {m.credit.text}{' '}
        {m.credit.href && (
          <a href={m.credit.href} target="_blank" rel="noopener noreferrer">
            {m.credit.linkText}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
