'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { saveToken } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', form);
      saveToken(data.data.token);
      router.push('/projects');
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'No se pudo iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5">
      <section className="card w-full">
        <h1 className="mb-2 text-2xl font-semibold text-brand-900">Gestor de Proyectos</h1>
        <p className="mb-6 text-sm text-slate-600">Inicia sesion para administrar tus proyectos y tareas.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              className="w-full rounded-md border border-slate-300 p-2"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Contrasena</label>
            <input
              className="w-full rounded-md border border-slate-300 p-2"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            />
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            className="w-full rounded-md bg-brand-700 px-4 py-2 font-medium text-white hover:bg-brand-900 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  );
}
