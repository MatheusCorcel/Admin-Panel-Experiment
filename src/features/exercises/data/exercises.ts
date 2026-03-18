import { type ExerciseTemplate } from './schema'

export const exerciseTemplates: ExerciseTemplate[] = [
  // ─── Chest ───────────────────────────────────────────────
  {
    id: 'et-001',
    name: 'Barbell Bench Press',
    muscleGroup: 'chest',
    coachCues:
      'Retract shoulder blades and plant them into the bench. Grip just outside shoulder-width, unrack with locked elbows. Lower bar to mid-chest under control; drive through the floor with your legs as you press. Keep wrists stacked over elbows throughout.',
  },
  {
    id: 'et-002',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'chest',
    coachCues:
      'Set bench to 30–45°. Bring dumbbells to shoulder height with palms facing forward. Press up and slightly inward until arms are almost fully extended. Lower with control, elbows at roughly 45° from torso. Keep core braced and avoid arching excessively.',
  },
  {
    id: 'et-003',
    name: 'Cable Flyes',
    muscleGroup: 'chest',
    coachCues:
      'Set pulleys at shoulder height. Stand in a split stance for stability. With a slight bend in the elbows, bring hands together in a hugging arc in front of your chest. Squeeze pecs at peak contraction. Slowly return to start — resist the pull; don\'t let arms fly back.',
  },
  {
    id: 'et-004',
    name: 'Dips (Chest-Focused)',
    muscleGroup: 'chest',
    coachCues:
      'Lean torso forward at ~30° throughout the movement. Lower until upper arms are parallel to the floor; press back up without fully locking out at the top. Keep elbows slightly flared to bias the chest. Avoid shrugging shoulders — keep them depressed.',
  },
  {
    id: 'et-005',
    name: 'Pec Deck (Machine Flye)',
    muscleGroup: 'chest',
    coachCues:
      'Adjust seat so handles are at shoulder height. Press forearms into pads and drive elbows together. Squeeze hard at peak contraction for 1 second. Open slowly to a comfortable stretch — stop before the pec feels impinged. Keep chest tall throughout.',
  },

  // ─── Back ────────────────────────────────────────────────
  {
    id: 'et-006',
    name: 'Barbell Row',
    muscleGroup: 'back',
    coachCues:
      'Hinge to roughly 45° with a neutral spine. Pull bar into lower ribs; lead with elbows, not hands. Squeeze shoulder blades at the top. Lower bar under control — don\'t let it crash down. Keep hips still; no rowing with momentum.',
  },
  {
    id: 'et-007',
    name: 'Pull-Ups',
    muscleGroup: 'back',
    coachCues:
      'Hang with a pronated grip just outside shoulder width. Initiate by depressing the shoulder blades, then pull elbows down toward your hips. Drive chest to the bar. Lower completely to a dead hang each rep to maintain full range of motion.',
  },
  {
    id: 'et-008',
    name: 'Seated Cable Row',
    muscleGroup: 'back',
    coachCues:
      'Sit tall, slight lean back, chest up. Drive elbows straight back and squeeze shoulder blades together at the top. Hold 1 second, then slowly extend arms while maintaining upright torso. Avoid rocking forward to use momentum.',
  },
  {
    id: 'et-009',
    name: 'Lat Pulldown',
    muscleGroup: 'back',
    coachCues:
      'Grip bar wider than shoulder width, lean back slightly. Pull bar to upper chest by driving elbows down and back — think "elbows to pockets." Squeeze lats hard at the bottom. Control the ascent; don\'t let the weight jerk your arms up.',
  },
  {
    id: 'et-010',
    name: 'Face Pulls',
    muscleGroup: 'back',
    coachCues:
      'Set cable at eye height, use a rope attachment. Pull to your face while rotating hands outward so thumbs point behind you (external rotation). Hold 1–2 seconds at peak contraction. Return slowly. Keep elbows level or slightly above the rope throughout.',
  },
  {
    id: 'et-011',
    name: 'T-Bar Row',
    muscleGroup: 'back',
    coachCues:
      'Straddle the bar, hinge forward 45°, neutral spine. Pull handles into your sternum. Drive elbows high and wide to maximize upper-back engagement. Hold at the top, then lower with full control. Brace core — prevent spinal rounding under load.',
  },
  {
    id: 'et-012',
    name: 'Single-Arm Dumbbell Row',
    muscleGroup: 'back',
    coachCues:
      'Plant supporting hand and knee on bench. Pull dumbbell straight up to hip, elbow grazing the side of your torso. Rotate slightly at the top to fully retract the scapula. Lower until arm is fully extended. Keep shoulder packed — don\'t let it shrug up.',
  },

  // ─── Shoulders ───────────────────────────────────────────
  {
    id: 'et-013',
    name: 'Overhead Press (Barbell)',
    muscleGroup: 'shoulders',
    coachCues:
      'Grip just outside shoulder width, bar resting on upper chest. Press straight up — move head back as bar passes face, then forward again at lockout. Keep core tight and glutes squeezed to prevent lumbar hyperextension. Lower to clavicles under control.',
  },
  {
    id: 'et-014',
    name: 'Dumbbell Lateral Raises',
    muscleGroup: 'shoulders',
    coachCues:
      'Slight forward lean at hips, tiny bend in elbows. Raise arms out to the sides leading with your pinkies (internally rotate slightly to isolate the lateral head). Stop at shoulder height. Lower in 3 counts — the eccentric builds the most muscle here.',
  },
  {
    id: 'et-015',
    name: 'Arnold Press',
    muscleGroup: 'shoulders',
    coachCues:
      'Start with dumbbells at chin height, palms facing you. As you press overhead, rotate palms forward. Reverse the rotation on the way down. Keep the movement fluid; avoid excessive arching. Sit on a bench with back support if loading heavy.',
  },
  {
    id: 'et-016',
    name: 'Rear Delt Flyes',
    muscleGroup: 'shoulders',
    coachCues:
      'Hinge to nearly parallel with the floor. With a slight elbow bend, raise arms out to the sides and slightly back — think "trying to show your armpits." Squeeze rear delts at the top; resist swinging with momentum. Use light weights and high reps.',
  },
  {
    id: 'et-017',
    name: 'Cable Lateral Raises',
    muscleGroup: 'shoulders',
    coachCues:
      'Stand side-on to the cable, low pulley. Cross cable in front of body and raise arm up to shoulder height leading with elbow. The constant cable tension keeps the delt under load through the full arc. Lower slowly — 3-second eccentric. Switch sides.',
  },

  // ─── Arms ────────────────────────────────────────────────
  {
    id: 'et-018',
    name: 'Barbell Curls',
    muscleGroup: 'arms',
    coachCues:
      'Stand with elbows pinned at sides. Curl the bar up by flexing elbows — don\'t let elbows drift forward. Squeeze biceps hard at the top; lower in 3 counts. Avoid swinging torso to generate momentum. Supinate the wrist slightly at peak for added contraction.',
  },
  {
    id: 'et-019',
    name: 'Hammer Curls',
    muscleGroup: 'arms',
    coachCues:
      'Neutral grip (thumbs up). Curl dumbbells straight up, keeping wrists neutral throughout. Focus on the brachialis and brachioradialis — drive knuckles toward your shoulder. Lower fully to a stretch. Can be done alternating or simultaneously.',
  },
  {
    id: 'et-020',
    name: 'Tricep Pushdowns (Cable)',
    muscleGroup: 'arms',
    coachCues:
      'Lean very slightly forward, elbows pinned tight to sides. Push bar or rope down until elbows are fully extended. For rope: flare handles out at the bottom for full lateral head contraction. Hold 1 second, then allow a controlled return — stop when forearms reach parallel.',
  },
  {
    id: 'et-021',
    name: 'Skull Crushers (EZ-Bar)',
    muscleGroup: 'arms',
    coachCues:
      'Lie flat, grip EZ-bar narrow. Lower bar toward forehead by bending only at the elbows — upper arms stay vertical and fixed. Extend to lockout. Keep wrists neutral. If you feel elbow pain, try a slight back-angle on the descent (lower toward top of head).',
  },
  {
    id: 'et-022',
    name: 'Overhead Tricep Extension',
    muscleGroup: 'arms',
    coachCues:
      'Hold a single dumbbell with both hands overhead, arms straight. Lower dumbbell behind head by bending elbows — upper arms stay close to ears. Extend back to full lockout, squeeze triceps. This overhead position provides maximum long-head stretch.',
  },
  {
    id: 'et-023',
    name: 'Preacher Curls',
    muscleGroup: 'arms',
    coachCues:
      'Rest upper arms fully on the pad. Curl bar up until forearms are vertical — no further. Lower fully until arms are almost straight for a complete stretch. Avoid jerking out of the bottom; the deep stretch position is high-risk for bicep tears if rushed.',
  },

  // ─── Legs ─────────────────────────────────────────────────
  {
    id: 'et-024',
    name: 'Back Squat',
    muscleGroup: 'legs',
    coachCues:
      'Bar on upper traps (high-bar) or lower (low-bar). Feet shoulder-width, toes slightly out. Break at hips and knees simultaneously, sitting down and back. Depth: hip crease below knee. Drive knees out over toes. Brace core hard — 360° of tension. Drive through the floor on ascent.',
  },
  {
    id: 'et-025',
    name: 'Romanian Deadlift',
    muscleGroup: 'legs',
    coachCues:
      'Start standing, soft bend in knees fixed throughout. Push hips back — bar tracks down the legs, staying close. Feel a strong hamstring stretch when bar reaches mid-shin. Drive hips forward to stand. Keep back flat; think "proud chest" to cue spinal extension.',
  },
  {
    id: 'et-026',
    name: 'Leg Press',
    muscleGroup: 'legs',
    coachCues:
      'Feet shoulder-width at mid-platform. Lower platform until knees reach 90° — lower if mobility allows without lower back rounding off the pad. Press through full foot. Avoid locking knees at the top. Keep lower back pressed firmly into seat throughout.',
  },
  {
    id: 'et-027',
    name: 'Leg Curls (Machine)',
    muscleGroup: 'legs',
    coachCues:
      'Lie prone; align knee joint with machine pivot. Curl heels toward glutes as far as possible — aim to keep hips pressed into pad. Hold peak contraction 1 second. Lower with a 3-second eccentric for maximum hamstring stimulus. Point toes for more bicep-femoris recruitment.',
  },
  {
    id: 'et-028',
    name: 'Leg Extensions (Machine)',
    muscleGroup: 'legs',
    coachCues:
      'Sit tall, align knee with machine pivot, pad resting on lower shin. Extend legs to full lockout and squeeze quads for 1 second. Lower slowly — don\'t slam the weight stack. Toes slightly inward targets the outer quad; slightly outward hits the inner. Keep hips on seat.',
  },
  {
    id: 'et-029',
    name: 'Calf Raises',
    muscleGroup: 'legs',
    coachCues:
      'Stand on edge of platform, heels hanging. Lower heels below the step for a full gastrocnemius stretch. Drive up onto the balls of your feet for full contraction, hold 2 seconds at top. Perform slowly — calves respond well to time under tension and full range of motion.',
  },
  {
    id: 'et-030',
    name: 'Bulgarian Split Squat',
    muscleGroup: 'legs',
    coachCues:
      'Rear foot elevated on bench, front foot 2–3 feet ahead. Lower rear knee toward floor while keeping front shin as vertical as possible. Front foot position determines muscle bias: more forward = more glute; more upright shin = more quad. Drive through heel to stand.',
  },
  {
    id: 'et-031',
    name: 'Hip Thrust',
    muscleGroup: 'legs',
    coachCues:
      'Upper back on bench, bar across hip crease (use pad). Feet hip-width, flat on floor. Drive hips up until body is a straight line from shoulders to knees. Squeeze glutes hard at the top for 2 seconds. Chin slightly tucked to avoid hyperextending the neck. Control the descent.',
  },
  {
    id: 'et-032',
    name: 'Deadlift (Conventional)',
    muscleGroup: 'legs',
    coachCues:
      'Feet hip-width, bar over mid-foot. Hinge down, grip just outside legs. Lats tight ("protect your armpits"), chest proud. Drive floor away — bar stays in contact with legs on the way up. Lock out with glutes — don\'t hyperextend. Lower bar under control, reset posture each rep.',
  },
  {
    id: 'et-033',
    name: 'Goblet Squat',
    muscleGroup: 'legs',
    coachCues:
      'Hold dumbbell or kettlebell at chest height with both hands. Feet shoulder-width, toes slightly out. Squat deep, elbows tracking inside knees. Keep chest tall throughout. Great for quad and glute development and practicing squat depth. Drive through heels to stand.',
  },

  // ─── Core ────────────────────────────────────────────────
  {
    id: 'et-034',
    name: 'Plank',
    muscleGroup: 'core',
    coachCues:
      'Elbows under shoulders, forearms flat. Maintain a straight line from head to heels — no sagging hips or raised glutes. Squeeze abs, glutes, and quads simultaneously. Breathe normally; don\'t hold your breath. Progress by adding time or elevating feet.',
  },
  {
    id: 'et-035',
    name: 'Hanging Leg Raises',
    muscleGroup: 'core',
    coachCues:
      'Dead hang from bar. Brace core and raise legs (knees bent = easier, straight = harder) until hip flexion reaches 90° or above. Avoid swinging — initiate the movement with abs, not hip flexor momentum. Lower with control — resist gravity on the way down.',
  },
  {
    id: 'et-036',
    name: 'Cable Crunch',
    muscleGroup: 'core',
    coachCues:
      'Kneel facing the cable, rope behind head. Crunch your rib cage toward your pelvis — don\'t just bow at the hips. The movement should be entirely in the abs. Hold peak contraction 1 second. Return to a full stretch (elbows toward ceiling) between reps.',
  },
  {
    id: 'et-037',
    name: 'Ab Wheel Rollout',
    muscleGroup: 'core',
    coachCues:
      'Kneel on padded surface. Roll wheel forward as far as you can without lumbar extension (arching lower back). Use abs to pull wheel back — not by bending your hips. Think "hollow body" — ribs down, pelvis slightly tucked. Start with partial range; increase over time.',
  },

  // ─── Full Body ────────────────────────────────────────────
  {
    id: 'et-038',
    name: 'Barbell Clean & Press',
    muscleGroup: 'full_body',
    coachCues:
      'Pull bar explosively from floor to front rack using hip extension. Catch in a partial squat, stand to full extension, then press overhead. Link the two movements with continuous hip drive. Keep elbows high during the catch; re-grip quickly for the press.',
  },
  {
    id: 'et-039',
    name: 'Kettlebell Swing',
    muscleGroup: 'full_body',
    coachCues:
      'Hinge, not squat — push hips back sharply to load hamstrings. Drive hips forward explosively; the bell floats to shoulder height from that hip snap, not from arm lifting. Absorb on the way back by hinging again immediately. Keep spine neutral; don\'t round lower back.',
  },
  {
    id: 'et-040',
    name: 'Burpees',
    muscleGroup: 'full_body',
    coachCues:
      'From standing, drop hands to floor, jump or step feet back to a plank. Perform a push-up (optional). Jump feet back to hands and explode upward, reaching arms overhead. Move at a sustainable pace — quality over speed. Keep core braced during the plank phase.',
  },
  {
    id: 'et-041',
    name: 'Thruster (Barbell or Dumbbell)',
    muscleGroup: 'full_body',
    coachCues:
      'Front rack position. Squat below parallel, then drive up explosively — use the leg momentum to initiate the press. Lock out overhead at the top in the same motion. Lower bar back to front rack as you begin the next squat. Keep elbows high out of the squat.',
  },
  {
    id: 'et-042',
    name: 'Power Clean',
    muscleGroup: 'full_body',
    coachCues:
      'Start with bar at mid-shin, shoulders over bar. First pull: extend legs, maintain back angle. Second pull: explosive hip extension as bar passes knees — shrug and pull elbows high. Receive bar in partial squat, front rack. Stand to complete the rep.',
  },
  {
    id: 'et-043',
    name: 'Box Jumps',
    muscleGroup: 'full_body',
    coachCues:
      'Stand arm\'s length from box. Dip quickly into a quarter squat, swing arms back, then explode upward. Land softly on both feet in a quarter squat — absorb impact through hips and knees, not just ankles. Step down; don\'t jump down to protect Achilles tendon.',
  },
  {
    id: 'et-044',
    name: 'Turkish Get-Up',
    muscleGroup: 'full_body',
    coachCues:
      'Start lying down, bell pressed overhead. Roll to elbow, then hand, then sweep leg through to a lunge, then stand. Keep eyes and bell pointing to the ceiling throughout every transition. Move deliberately — this is a skill, not a race. Reverse the steps to return to the floor.',
  },
  {
    id: 'et-045',
    name: 'Farmer\'s Carry',
    muscleGroup: 'full_body',
    coachCues:
      'Hold heavy dumbbells or kettlebells at sides. Stand tall — shoulders back and down, core braced, chin level. Walk with purpose using short strides. Avoid side-to-side swinging of the weights. This builds grip, traps, and core stability simultaneously.',
  },
]
