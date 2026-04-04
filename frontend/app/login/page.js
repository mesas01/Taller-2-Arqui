'use client';

import { useState } from 'react';
import Link from 'next/link';
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
    <main className="page-shell flex min-h-screen items-center">
      <div className="page-glow" aria-hidden="true" />
      <section className="surface grid w-full overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 p-8 text-white sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.14),transparent_30%)]" />
          <div className="relative">
            <span className="hero-badge border-white/15 bg-white/10 text-sky-50">Client-Server App</span>
            <h1 className="mt-6 max-w-sm text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Gestiona proyectos y tareas con una interfaz limpia.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
              Inicia sesion, organiza tu trabajo y crea nuevas tareas sin perder contexto.
            </p>
          </div>

          <div className="relative mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ['Seguridad', 'JWT + sesiones'],
              ['Flujo', 'Proyectos y tareas'],
              ['Deploy', 'Oracle + HTTPS']
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-300">{label}</div>
                <div className="mt-2 text-sm font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">Acceso</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Bienvenido de vuelta</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Usa tu cuenta o crea una nueva si quieres probar el flujo completo desde cero.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
              />
            </div>
            {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button className="btn-primary w-full" disabled={loading} type="submit">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            ¿No tienes cuenta?{' '}
            <Link className="font-semibold text-sky-700 hover:text-sky-900" href="/register">
              Crear una cuenta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
