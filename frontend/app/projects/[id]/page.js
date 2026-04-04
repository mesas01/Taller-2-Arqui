'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AuthGuard from '../../../components/AuthGuard';
import api from '../../../lib/api';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState('');

  const statuses = [
    { value: 'todo', label: 'To-do' },
    { value: 'in_progress', label: 'En progreso' },
    { value: 'done', label: 'Hecha' }
  ];

  async function loadTasks() {
    try {
      const { data } = await api.get(`/projects/${projectId}/tasks`);
      setTasks(data.data);
    } catch {
      setError('No se pudieron cargar las tareas');
    }
  }

  useEffect(() => {
    if (projectId) {
      loadTasks();
    }
  }, [projectId]);

  async function updateTaskStatus(taskId, status) {
    setUpdatingTaskId(taskId);
    setError('');

    try {
      const { data } = await api.patch(`/projects/${projectId}/tasks/${taskId}`, { status });
      setTasks((current) => current.map((task) => (task._id === taskId ? data.data : task)));
    } catch {
      setError('No se pudo actualizar el estado de la tarea');
    } finally {
      setUpdatingTaskId('');
    }
  }

  return (
    <AuthGuard>
      <main className="page-shell min-h-screen">
        <div className="page-glow" aria-hidden="true" />

        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/85 p-6 shadow-[0_24px_80px_rgba(2,6,23,0.14)] backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <span className="hero-badge">Tareas</span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Tareas del proyecto</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Cambia el estado de cada tarea con un clic y navega entre proyectos sin perder contexto.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="btn-secondary" onClick={() => router.push('/projects')} type="button">
              Volver a proyectos
            </button>
            <Link className="btn-primary" href={`/projects/${projectId}/new-task`}>
              Nueva tarea
            </Link>
          </div>
        </header>

        {error && <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <section className="grid gap-4">
          {tasks.map((task) => (
            <article key={task._id} className="card">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">Estado actual: {task.status}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      type="button"
                      disabled={updatingTaskId === task._id && task.status === status.value}
                      onClick={() => updateTaskStatus(task._id, status.value)}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                        task.status === status.value
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {updatingTaskId === task._id && task.status !== status.value ? 'Guardando...' : status.label}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
          {tasks.length === 0 && <div className="empty-state">No hay tareas registradas.</div>}
        </section>
      </main>
    </AuthGuard>
  );
}
