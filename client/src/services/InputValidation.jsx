import React from 'react'
import z from "zod"


export const inputValidation = z.object({
  id: z.string().length(9, {message: "id must contains 9 numbers"}),
  name: z.string().min(2, {message: "Name's too short"}).max(25),
  position: z.string().max(20).min(3, {message: "position too short"}),
  salary: z.string().min(3, {message: "salary is too samll"})
})
