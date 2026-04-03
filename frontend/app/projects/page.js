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
      if (err?.response?.status === 401) {
        clearToken();
        router.push('/login');
      } else {
        setError('No se pudieron cargar los proyectos');
      }
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/projects', form);
      setForm({ title: '', description: '' });
      await loadProjects();
    } catch {
      setError('No se pudo crear el proyecto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-brand-900">Mis Proyectos</h1>
          <button
            onClick={() => {
              clearToken();
              router.push('/login');
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            type="button"
          >
            Cerrar sesion
          </button>
        </div>

        <section className="card mb-6">
          <h2 className="mb-3 text-lg font-semibold">Crear Proyecto</h2>
          <form className="space-y-3" onSubmit={handleCreate}>
            <input
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
