'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AuthGuard from '../../../components/AuthGuard';
import api from '../../../lib/api';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id;
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <AuthGuard>
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-brand-900">Tareas del Proyecto</h1>
          <Link className="rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white" href={`/projects/${projectId}/new-task`}>
            Nueva tarea
          </Link>
        </div>

        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

        <section className="grid gap-4">
          {tasks.map((task) => (
            <article key={task._id} className="card">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-slate-600">Estado: {task.status}</p>
            </article>
          ))}
          {tasks.length === 0 && <p className="text-sm text-slate-600">No hay tareas registradas.</p>}
        </section>
      </main>
    </AuthGuard>
  );
}
