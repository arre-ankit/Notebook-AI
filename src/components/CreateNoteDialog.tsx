'use client';
import { Plus } from 'lucide-react';
import React from 'react'
import {Dialog, DialogContent,DialogTitle, DialogTrigger,DialogHeader, DialogDescription} from '@/components/ui/dialog'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {}

const CreateNoteDialog = (props: Props) => {
  const [input,setInput] = React.useState('')
  const createNoteBook = useMutation({
    mutationFn: async()=>{
      const responce = await axios.post('/api/createNotebook',{name:input})
      return responce.data
    }
  })
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(input === ''){
      window.alert('Please enter a name for NoteBook')
      return
    }
    createNoteBook.mutate(undefined,{
      onSuccess:()=>{
        console.log('NoteBook created')
      },
      onError:(error)=>{
        console.error(error)
      }
    })
  };

  return (
    <Dialog>
        <DialogTrigger>
            <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg item-centre justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
                <Plus className='w-6 h-6 text-green-600' strokeWidth={3}/>
                <h2 className='font-semibold text-green-600 sm:mt-2'>New NoteBook</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create a new note
            </DialogTitle>
            <DialogDescription>
              Start writing your note here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Input value={input} 
              onChange={(e)=>setInput(e.target.value)}
              placeholder='Name..'/>
            <div className="h-4"></div>
            <div className='flex items-center gap-2'>
              <Button type='reset' variant={"secondary"}>
                Cancle
              </Button>
              <Button className='bg-green-600'>Create</Button>
            </div>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog