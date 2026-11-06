import { line, type Lesson } from './types'

export const italian: Lesson = {
  id: 'italian',
  name: 'Italian Game',
  subtitle: 'Giuoco Pianissimo · play as White',
  side: 'white',
  intro:
    'A classic, calm opening. You develop quickly, aim your bishop at f7, and build the centre slowly before striking with d4.',
  summary: [
    'Bring the knight round with Nf1–g3 to eye f5 and h5.',
    'Keep the bishop safe on b3 or a2, still aiming at f7.',
    'Push d3–d4 when your pieces are ready to support it.',
  ],
  root: line([
    { san: 'e4', explain: 'Grab the centre and open lines for your bishop and queen.', hint: 'Push your king’s pawn two squares.' },
    { san: 'e5', explain: 'Black does the same, claiming an equal share of the centre.' },
    { san: 'Nf3', explain: 'Develop a knight and attack the pawn on e5 straight away.', hint: 'Develop a knight that attacks Black’s e-pawn.' },
    { san: 'Nc6', explain: 'Black develops too and defends e5.' },
    { san: 'Bc4', explain: 'The Italian bishop! It aims at f7, the weakest square near Black’s king.', hint: 'Put your light-squared bishop on a diagonal that aims at f7.' },
    { san: 'Bc5', explain: 'Black mirrors you, aiming at f2. This is the Giuoco Piano, the “quiet game”.' },
    { san: 'c3', explain: 'Prepare d4 to build a big pawn centre, and give your bishop a retreat square later.', hint: 'Play a small pawn move that prepares d4.' },
    { san: 'Nf6', explain: 'Black develops and puts pressure on your e4 pawn.' },
    { san: 'd3', explain: 'Calmly protect e4. You keep a solid centre and save d4 for later. That is the “Pianissimo”.', hint: 'Protect e4 with a pawn.' },
    { san: 'd6', explain: 'Black solidly supports e5 and opens the way for the c8 bishop.' },
    { san: 'O-O', explain: 'Get your king safe and bring the rook toward the centre.', hint: 'Get your king to safety.' },
    { san: 'O-O', explain: 'Black castles too.' },
    { san: 'Re1', explain: 'The rook backs up e4 and frees f1 for your knight’s journey (Nbd2–f1–g3).', hint: 'Bring a rook to the e-file.' },
    { san: 'a6', explain: 'Black makes room for the bishop on a7, so it can’t be hit by b4 or d4.' },
    { san: 'a4', explain: 'Grab queenside space and stop Black from gaining space with …b5.', hint: 'Stop Black from pushing …b5.' },
    { san: 'Ba7', explain: 'The bishop tucks away safely while still aiming at f2.' },
    { san: 'h3', explain: 'Take g4 away from Black’s bishop so it can’t pin your knight.', hint: 'Take g4 away from Black’s light-squared bishop.' },
    { san: 'h6', explain: 'Black does the same: no Bg5 pin for you.' },
    { san: 'Nbd2', explain: 'Develop your last minor piece behind the c-pawn. Next it heads to f1 and g3.', hint: 'Develop your last minor piece, keeping the c-pawn free.' },
  ]),
}
