import { Navigate, useParams } from 'react-router-dom'
import { MarkdownBody } from '../components/MarkdownBody'
import { NoteScreen } from '../components/NoteScreen'
import { getEnglishNote, noteIconClass } from '../lib/englishNotes'

export default function EnglishNotePage() {
  const { slug } = useParams()
  const note = getEnglishNote(slug)

  if (!note) {
    return <Navigate to="/" replace />
  }

  return (
    <NoteScreen title={note.title} iconClass={noteIconClass(note.slug)}>
      <MarkdownBody source={note.content} />
    </NoteScreen>
  )
}