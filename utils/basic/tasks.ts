export const sortTasks = <
  T extends {
    createdAt: Date;
    title: string;
    creator: { name: string };
  }
>(
  tasks: T[] | null,
  sortBy: 'date' | 'title' | 'creator',
  order: 'up' | 'down'
): T[] | null => {
  if (!tasks || tasks.length === 0) return tasks;

  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
        break;

      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;

      case 'creator':
        comparison = a.creator.name.localeCompare(b.creator.name);
        break;

      default:
        comparison = 0;
    }

    return order === 'up' ? comparison : -comparison;
  });

  return sorted;
};
