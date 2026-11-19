import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NoteScreen } from '../components/NoteScreen'
import { listEnglishNotes, noteIconClass } from '../lib/englishNotes'

export default function EnglishNotesIndex() {
  const englishNotes = listEnglishNotes()

  return (
    <NoteScreen title="English Notes">
      <p className="note">Tap a topic to read the note.</p>
      <nav className="menu">
        {englishNotes.map((note) => (
          <Link key={note.slug} to={`/english-notes/${note.slug}`} className="menu-btn">
            <span className={`menu-icon ${noteIconClass(note.slug)}`} aria-hidden>
              <BookOpen size={22} strokeWidth={2.35} />
            </span>
            <span className="menu-body">
              <strong>{note.title}</strong>
              <span className="desc">Study note</span>
            </span>
          </Link>
        ))}
      </nav>
    </NoteScreen>
  )
}