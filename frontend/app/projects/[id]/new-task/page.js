'use client';

import { useState } from 'react';
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
      <main className="mx-auto max-w-xl px-5 py-8">
        <section className="card">
          <h1 className="mb-4 text-2xl font-semibold text-brand-900">Nueva Tarea</h1>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md border border-slate-300 p-2"
              placeholder="Titulo de la tarea"
              value={form.title}
              required
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            />
            <select
              className="w-full rounded-md border border-slate-300 p-2"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="todo">todo</option>
              <option value="in_progress">in_progress</option>
              <option value="done">done</option>
            </select>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button className="rounded-md bg-brand-700 px-4 py-2 text-white" disabled={loading} type="submit">
              {loading ? 'Guardando...' : 'Guardar tarea'}
            </button>
          </form>
        </section>
      </main>
    </AuthGuard>
  );
}
