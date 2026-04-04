'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { saveToken } from '../../lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/register', form);
      saveToken(data.data.token);
      router.push('/projects');
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5">
      <section className="card w-full">
        <h1 className="mb-2 text-2xl font-semibold text-brand-900">Crear cuenta</h1>
        <p className="mb-6 text-sm text-slate-600">Registra un usuario nuevo para acceder al gestor de proyectos.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Nombre</label>
            <input
              className="w-full rounded-md border border-slate-300 p-2"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
          </div>
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
              minLength={8}
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
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          ¿Ya tienes cuenta?{' '}
          <Link className="font-medium text-brand-700 hover:text-brand-900" href="/login">
            Iniciar sesion
          </Link>
        </p>
      </section>
    </main>
  );
}