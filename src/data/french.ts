import { line, type Lesson } from './types'

export const french: Lesson = {
  id: 'french',
  name: 'French Defence',
  subtitle: 'Advance Variation · play as Black',
  side: 'black',
  intro:
    'A solid, counter-punching defence. You let White grab space, then attack the base of White’s pawn chain.',
  summary: [
    'Keep pressure on d4: that is the base of White’s chain.',
    'Your knight on e7 often goes to f5 to hit d4 again.',
    'Play on the queenside, where your pawns have the space.',
  ],
  root: line([
    { san: 'e4', explain: 'White grabs the centre.' },
    { san: 'e6', explain: 'A modest move that prepares …d5 with a pawn behind it.', hint: 'Make a quiet pawn move that prepares to challenge the centre.' },
    { san: 'd4', explain: 'White builds a big two-pawn centre.' },
    { san: 'd5', explain: 'Strike at e4 right away. Your e6 pawn supports this one.', hint: 'Challenge White’s e-pawn directly.' },
    { san: 'e5', explain: 'The Advance: White gains space and takes f6 away from your knight.' },
    { san: 'c5', explain: 'Hit the base of White’s pawn chain (d4). This is the key French idea.', hint: 'Strike at the base of White’s pawn chain.' },
    { san: 'c3', explain: 'White supports d4 with another pawn.' },
    { san: 'Nc6', explain: 'Add a second attacker on d4.', hint: 'Add another attacker on d4 with a knight.' },
    { san: 'Nf3', explain: 'White defends d4 with a knight.' },
    { san: 'Qb6', explain: 'A third attacker on d4, and the queen also eyes b2.', hint: 'Bring your queen out to hit d4 and b2.' },
    { san: 'a3', explain: 'White prepares b4 to gain queenside space.' },
    { san: 'c4', explain: 'Lock the queenside and grab space there before White’s b4 comes.', hint: 'Close the queenside by advancing your c-pawn.' },
    { san: 'Nbd2', explain: 'White develops, planning to bring the knight round.' },
    { san: 'Na5', explain: 'The knight eyes the b3 hole that White’s pawns can no longer guard.', hint: 'Send your c6 knight toward the b3 hole.' },
    { san: 'Be2', explain: 'White develops and gets ready to castle.' },
    { san: 'Bd7', explain: 'Develop your “bad” light-squared bishop. It can later jump to a4 or b5.', hint: 'Develop your light-squared bishop one square.' },
    { san: 'O-O', explain: 'White castles.' },
    { san: 'Ne7', explain: 'f6 is blocked, so this knight goes e7 and then f5 to hit d4 once more.', hint: 'Develop your kingside knight. f6 is taken, so find another square.' },
  ]),
}
