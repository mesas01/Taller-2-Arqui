'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import api from '../../lib/api';
import { clearToken } from '../../lib/auth';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadProjects() {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch (err) {
          <main className="page-shell min-h-screen">
            <div className="page-glow" aria-hidden="true" />

            <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/85 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.14)] backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <span className="hero-badge">Dashboard</span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Mis proyectos</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Crea, revisa y entra a cada proyecto desde una vista más clara y rápida.
                </p>
              </div>
              <button
                onClick={() => {
                  clearToken();
                  router.push('/login');
                }}
                className="btn-secondary w-fit"
                type="button"
              >
                Cerrar sesion
              </button>
            </header>

            <section className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="card">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Proyectos</div>
                <div className="mt-3 text-3xl font-semibold text-slate-900">{projects.length}</div>
                <p className="mt-2 text-sm text-slate-600">Registrados en tu tablero</p>
              </div>
              <div className="card">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Accion rapida</div>
                <div className="mt-3 text-3xl font-semibold text-slate-900">Nuevo</div>
                <p className="mt-2 text-sm text-slate-600">Crea un proyecto en segundos</p>
              </div>
              <div className="card">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Estado</div>
                <div className="mt-3 text-3xl font-semibold text-slate-900">Activa</div>
                <p className="mt-2 text-sm text-slate-600">Sesion protegida con JWT</p>
              </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="panel">
                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Crear proyecto</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Empieza algo nuevo</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Dale nombre, agrega contexto y luego entra a gestionar sus tareas.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleCreate}>
                  <input
                    className="input-field"
                    placeholder="Titulo"
                    value={form.title}
                    required
                    onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  />
                  <textarea
                    className="input-field min-h-32 resize-y"
                    placeholder="Descripcion"
                    value={form.description}
                    onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  />
                  {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                  <button className="btn-primary" disabled={loading} type="submit">
                    {loading ? 'Creando...' : 'Crear Proyecto'}
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                <div className="mb-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Listado</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Tus proyectos</h2>
                  </div>
                  <span className="project-chip">{projects.length} items</span>
                </div>

                {projects.map((project) => (
                  <article key={project._id} className="card group transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(2,6,23,0.16)]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{project.description || 'Sin descripcion'}</p>
                      </div>
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">Activo</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200/80 pt-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Proyecto</div>
                      <Link className="btn-secondary px-3 py-2 text-sm" href={`/projects/${project._id}`}>
                        Ver tareas
                      </Link>
                    </div>
                  </article>
                ))}
                {projects.length === 0 && (
                  <div className="empty-state">
                    <p className="text-base font-medium text-slate-800">Aun no tienes proyectos.</p>
                    <p className="mt-2 text-sm">Crea el primero desde el panel de la izquierda.</p>
                  </div>
                )}
              </div>
              className="w-full rounded-md border border-slate-300 p-2"
              placeholder="Titulo"
              value={form.title}
              required
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            />
            <textarea
              className="w-full rounded-md border border-slate-300 p-2"
              placeholder="Descripcion"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button className="rounded-md bg-brand-700 px-4 py-2 text-white" disabled={loading} type="submit">
              {loading ? 'Creando...' : 'Crear Proyecto'}
            </button>
          </form>
        </section>

        <section className="grid gap-4">
          {projects.map((project) => (
            <article key={project._id} className="card">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mb-3 text-sm text-slate-600">{project.description || 'Sin descripcion'}</p>
              <Link className="text-sm font-medium text-brand-700 hover:underline" href={`/projects/${project._id}`}>
                Ver tareas
              </Link>
            </article>
          ))}
          {projects.length === 0 && <p className="text-sm text-slate-600">Aun no tienes proyectos.</p>}
        </section>
      </main>
    </AuthGuard>
  );
}
