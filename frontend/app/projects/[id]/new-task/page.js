'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '../../../../components/AuthGuard';
import api from '../../../../lib/api';
import { getToken } from '../../../../lib/auth';

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function NewTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', status: 'todo' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = getToken();
    const payload = token ? parseJwt(token) : null;

    if (!payload?.userId) {
      setError('Sesion invalida. Vuelve a ingresar.');
      setLoading(false);
      return;
    }

    try {
      await api.post(`/projects/${params.id}/tasks`, {
        ...form,
        assigneeId: payload.userId
      });
      router.push(`/projects/${params.id}`);
    } catch {
      setError('No se pudo crear la tarea');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <main className="page-shell min-h-screen">
        <div className="page-glow" aria-hidden="true" />
        <section className="mx-auto max-w-xl panel">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Nueva tarea</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Crear tarea</h1>
            </div>
            <Link className="btn-secondary" href={`/projects/${params.id}`}>
              Volver
            </Link>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="input-field"
              placeholder="Titulo de la tarea"
              value={form.title}
              required
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            />
            <select
              className="input-field"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="todo">To-do</option>
              <option value="in_progress">En progreso</option>
              <option value="done">Hecha</option>
            </select>

            {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button className="btn-primary" disabled={loading} type="submit">
              {loading ? 'Guardando...' : 'Guardar tarea'}
            </button>
          </form>
        </section>
      </main>
    </AuthGuard>
  );
}
