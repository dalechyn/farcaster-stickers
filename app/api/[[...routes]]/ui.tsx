import { createSystem } from "frog/ui";

export const {Box, VStack, HStack, Divider, Image, Text, vars} = createSystem({
  frame: {
    height: 314,
    width: 600
  },
  colors: {
    text: '#24292e',
    background: '#ffffff',
    muted: '#546473'
  },
  fonts: {
    default: [
      {
        source: 'google',
        name: 'Inter',
        weight: 400
      },
      {
        source: 'google',
        name: 'Inter',
        weight: 700
      }
    ]
  }
})
