import { z } from 'zod';

export const mainFormSchema = z.object({
  tags: z.array(z.string()).min(1, 'Нужно указать хотя бы один тег'),
  transport: z.array(z.enum(['plane', 'bus', 'bike', 'foot'])),
  peopleAmount: z.number().min(1, 'Это обязательное поле'),
  duration: z.number().min(1, 'Это обязательное поле'),
  isChildrenAllowed: z.boolean(),
  dateRange: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  })
    .refine(
      (range) => range.from !== null && range.to !== null,
      {
        message: 'Выберите диапазон дат',
        path: ['from'], // укажет, где показывать ошибку
      }
    ),
  countries: z
    .array(
      z.object({
        value: z.string().trim(),
      })
    )
    .max(4, 'Можно выбрать максимум 4 страны')
    .refine(
      (arr) => arr.some((item) => item.value.trim() !== ''),
      { message: 'Нужно выбрать хотя бы одну страну' }
    ),
  comments: z
    .object({})
    .catchall(z.string().max(200, 'Комментарий не должен превышать 200 символов')),
});

export type FormValues = z.infer<typeof mainFormSchema>;
