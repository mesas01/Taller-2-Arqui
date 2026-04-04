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
    <main className="page-shell flex min-h-screen items-center">
      <div className="page-glow" aria-hidden="true" />
      <section className="surface grid w-full overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-gradient-to-br from-cyan-600 via-sky-700 to-slate-950 p-8 text-white sm:p-10">
          <span className="hero-badge border-white/15 bg-white/10 text-cyan-50">Nuevo usuario</span>
          <h1 className="mt-6 max-w-sm text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Crea tu cuenta y empieza a organizar el trabajo.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-200 sm:text-base">
            El registro es inmediato: creas el usuario, recibes sesión y entras directo al tablero.
          </p>

          <div className="mt-10 grid gap-3">
            {[
              'Registro rápido y directo',
              'Acceso al tablero al instante',
              'Listo para proyectos y tareas'
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">Registro</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Empieza en minutos</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Completa los datos y tendrás acceso inmediato al sistema con tu propia cuenta.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nombre</label>
              <input
                className="input-field"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input
                className="input-field"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contrasena</label>
              <input
                className="input-field"
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              />
            </div>
            {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button className="btn-primary w-full" disabled={loading} type="submit">
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-900" href="/login">
              Iniciar sesion
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}