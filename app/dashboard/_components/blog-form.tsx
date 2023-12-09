'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Edit2Icon,
  EyeIcon,
  RocketIcon,
  SaveIcon,
  StarIcon,
} from 'lucide-react'
import { useState, useTransition } from 'react'
import { LiaSpinnerSolid } from 'react-icons/lia'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import MarkdownPreview from '@/components/markdown/markdown-preview'
import { BlogFormSchemaType, blogformSchema } from '@/lib/schema/blog'
import { IBlogDetail } from '@/types/blog'

type FormBlogProps = {
  // eslint-disable-next-line no-unused-vars
  onHandleSubmit: (data: BlogFormSchemaType) => void
  blog?: IBlogDetail
}

export default function FormBlog({ onHandleSubmit, blog }: FormBlogProps) {
  const [isPreview, setIsPreview] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof blogformSchema>>({
    mode: 'all',
    resolver: zodResolver(blogformSchema),
    defaultValues: {
      title: blog?.title || '',
      image_url: blog?.image_url || '',
      content: blog?.blog_content?.content || '',
      is_published: blog?.is_published || false,
      is_prenium: blog?.is_prenium || false,
    },
  })

  function onSubmit(values: z.infer<typeof blogformSchema>) {
    startTransition(() => {
      onHandleSubmit(values)
    })
  }

  const isUrlImageValid = !form.getFieldState('image_url').invalid

  return (
    <div>
      <div className="flex justify-end items-center pb-4 pr-4">
        <Button
          disabled={!isUrlImageValid && !isPreview}
          onClick={() => setIsPreview(!isPreview && isUrlImageValid)}
          tabIndex={0}
          className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all text-white"
        >
          {isPreview ? (
            <>
              <Edit2Icon size={18} />
              Edit
            </>
          ) : (
            <>
              <EyeIcon size={18} />
              Preview
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full border space-y-6 rounded-md pb-10"
        >
          <div className="p-5 flex items-center flex-wrap justify-between border-b gap-5">
            <div className="flex flex-wrap items-center gap-5">
              <FormField
                control={form.control}
                name="is_prenium"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center border gap-1 bg-zinc-700 rounded-md p-2">
                      <StarIcon size={18} />
                      <span>Prenium</span>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center border gap-1 bg-zinc-700 rounded-md p-2">
                      <RocketIcon size={18} />
                      <span>Publish</span>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button className="gap-1" disabled={!form.formState.isValid}>
              {isPending ? (
                <LiaSpinnerSolid className="animate-spin" />
              ) : (
                <SaveIcon />
              )}
              Sauvegarder
            </Button>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'p-2 w-full flex break-words gap-2',
                      isPreview ? 'divide-x-0' : 'divide-x',
                    )}
                  >
                    <Input
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2',
                      )}
                      placeholder="Vote title"
                      {...field}
                    />
                    <div
                      className={cn(
                        'lg:px-10',
                        isPreview
                          ? 'mx-auto w-full lg:w-4/5'
                          : 'w-1/2 lg:block hidden',
                      )}
                    >
                      <h2 className="text-3xl font-medium">
                        {form.getValues().title}
                      </h2>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'p-2 w-full flex break-words gap-2',
                      isPreview ? 'divide-x-0' : 'divide-x',
                    )}
                  >
                    <Input
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2',
                      )}
                      placeholder="image url"
                      {...field}
                    />
                    <div
                      className={cn(
                        'lg:px-10',
                        isPreview
                          ? 'mx-auto w-full lg:w-4/5'
                          : 'w-1/2 lg:block hidden',
                      )}
                    >
                      {!isPreview ? (
                        <p>Cliquez sur Préview pour voir l&apos;image</p>
                      ) : (
                        <div className="relative h-80 border rounded-md">
                          <Image
                            src={form.getValues().image_url}
                            fill
                            className="object-cover object-center rounded-md"
                            alt="Prévisuation de l'image sélectionnée"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className={cn(
                      'p-2 w-full flex break-words gap-2',
                      isPreview ? 'divide-x-0' : 'divide-x h-70vh',
                    )}
                  >
                    <Textarea
                      className={cn(
                        'border-none text-lg font-medium leading-relaxed resize-none h-full',
                        isPreview ? 'w-0 p-0' : 'w-full lg:w-1/2',
                      )}
                      placeholder="Vote contenu"
                      {...field}
                    />
                    <div
                      className={cn(
                        ' overflow-y-auto p-2',
                        isPreview
                          ? 'mx-auto w-full lg:w-4/5'
                          : 'w-1/2 lg:block hidden',
                      )}
                    >
                      <MarkdownPreview content={form.getValues().content} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
