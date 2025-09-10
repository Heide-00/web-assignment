import React, { useEffect, useState } from 'react';
import { Post } from 'src/types/Post';

interface Props {
  onAdd?: (post: Post) => void;
  onUpdate?: (post: Post) => void;
  onCancel?: () => void;
  initialData?: Post;
}

export default function PostForm(props: Props): React.ReactElement {
  const { onAdd, onUpdate, onCancel, initialData } = props;

  const [form, setForm] = useState<Post>({
    id: Date.now(),
    title: '',
    userId: 1,
    body: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        title: initialData.title,
        userId: initialData.userId,
        body: initialData.body ?? '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!form.title.trim() || !form.body?.trim()) return;

    if (initialData && onUpdate) {
      onUpdate(form);
    } else if (onAdd) {
      onAdd(form);
    }

    setForm({
      id: Date.now(),
      title: '',
      userId: 1,
      body: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Başlık"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="body"
        value={form.body}
        onChange={handleChange}
        placeholder="İçerik"
        className="w-full border p-2 rounded h-40 resize-none"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? 'Güncelle' : 'Gönder'}
        </button>
        {initialData && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}