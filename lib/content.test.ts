import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import test from 'node:test';

import { attachFigures, buildArticle, figuresFor, headingAnchor, parseCaseMarkdown } from './case-layout.ts';
import { about, cases, contact, experience, hero, metrics, site } from './content.ts';

const SOURCE_ROOTS = ['app', 'components', 'lib', 'content'];
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json']);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXTS.has(extname(full)) && !full.endsWith('.test.ts')) {
      files.push(full);
    }
  }
  return files;
}

const sourceBlob = SOURCE_ROOTS.flatMap((root) => walk(root))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

test('hero keeps the locked headline and leads with Ovee proof', () => {
  assert.equal(hero.headline, 'I build AI systems that can’t afford a second take.');
  assert.equal(hero.headlineLead + hero.headlineEm, hero.headline);
  assert.equal(
    hero.lede,
    'I build real-time AI systems people can trust in the room—live-event AI with an operator in the approval loop, and the product around it. Five years across web, mobile and cloud.',
  );
  assert.match(hero.lede, /approval loop/);
  assert.equal(
    hero.proof,
    'Ovee, live-event AI: cleared by a Fortune-500 client’s IT, privacy and data-control review; synthesised 60 roundtables for 600 leaders in seconds.',
  );
  assert.equal(hero.proof.includes('Live-event AI'), false);
  assert.equal(hero.primaryCta.label, 'Explore selected work');
  assert.equal(hero.primaryCta.href, '#work');
  assert.equal(hero.secondaryCta.label, 'Get in touch');
  assert.equal(hero.secondaryCta.href, '#contact');
});

test('selected work order is AI, visitor, WebAR, concierge', () => {
  assert.deepEqual(
    cases.map((item) => item.slug),
    ['ai', 'visitor', 'webar', 'concierge'],
  );
  assert.deepEqual(
    cases.map((item) => item.id),
    ['01', '02', '03', '04'],
  );
  assert.deepEqual(
    cases.map((item) => item.href),
    ['/cases/ai', '/cases/visitor', '/cases/webar', '/cases/concierge'],
  );
});

test('homepage cards keep V4.1 anatomy and titles', () => {
  assert.equal(cases[0].title, 'Ovee — AI for live events.');
  assert.equal(cases[1].title, 'Immersive visitor platform.');
  assert.equal(`${cases[1].id} / ${cases[1].title}`, '02 / Immersive visitor platform.');
  assert.equal(cases[2].title, 'Global WebAR experience.');
  assert.equal(cases[3].title, 'Museum AI concierge.');
  for (const study of cases) {
    assert.equal(study.delivered.length, 3);
    assert.ok(study.label);
    assert.ok(study.summary);
    assert.ok(study.stack.length >= 5);
    assert.match(study.cta, /Explore the (engineering|architecture)/);
  }
  assert.equal(cases[3].prototype, true);
  assert.match(cases[3].label, /working prototype/);
  assert.match(cases[2].label, /^Owned the browser experience/);
  assert.equal(cases[2].scale, '~2,100 participants across 12 locations.');
  assert.equal(
    cases[0].summary,
    'Ovee turns stage discussions and workshop contributions into questions, themes and reports. I was the primary engineer across the operator interfaces, Python services, model integration and audience delivery. Delivered at 4 live events across Asia and Europe: a three-summit leadership tour for a Fortune-500 multinational, plus mci group’s CheckedIn 2026 in Geneva, where Ovee was billed as a panellist alongside the group CEO. In the moderated stage workflow, an operator approves each AI contribution before it is spoken.',
  );
  assert.deepEqual(cases[0].delivered, [
    'Operator workflows for reviewing, approving and discarding AI contributions before stage delivery.',
    'Workshop synthesis that turned 60 roundtables into themes on the main display in about five seconds.',
    'Session services, playback guards and recovery paths connecting AI output to the live audience experience.',
  ]);
  assert.match(cases[0].label, /Primary engineer/);
  assert.match(cases[0].label, /Dorier/);
  assert.deepEqual(cases[0].stack, [
    'React',
    'TypeScript',
    'Python',
    'FastAPI',
    'Azure OpenAI',
    'WebRTC',
    'WebSockets',
  ]);
  assert.equal(cases[0].summary.includes('operator approval'), false);
  assert.equal(
    cases[0].delivered.includes('Real-time voice and audience communication using WebRTC and WebSockets.'),
    false,
  );
});

test('visitor homepage card uses the immersive platform copy', () => {
  const visitor = cases[1];
  assert.equal(visitor.id, '02');
  assert.equal(visitor.slug, 'visitor');
  assert.equal(visitor.year, '2025–2026');
  assert.equal(visitor.href, '/cases/visitor');
  assert.equal(visitor.title, 'Immersive visitor platform.');
  assert.equal(visitor.label, 'Core engineer across mobile apps, native Android and Go services · Dorier for the UN Geneva Visitor Centre · 2025–2026');
  assert.equal(
    visitor.summary,
    'Visitors explore with location-aware audio guides while staff control the tour and kiosks host a shared voting experience. As a core engineer on the team, I built across React Native apps, native Android modules, Go services and content tools to make that journey work.',
  );
  assert.deepEqual(visitor.delivered, [
    'Native positioning and headphone-reconnection handling, plus audio drift and playback fixes.',
    'Device-aware tour control and group-tour language flows across applications, CMS and backend services.',
    'Multilingual content integration, operator tools and the platform’s technical documentation.',
  ]);
  assert.deepEqual(visitor.stack, ['React Native', 'TypeScript', 'Kotlin', 'Go', 'MQTT', 'Payload CMS', 'PostgreSQL']);
  assert.equal(visitor.cta, 'Explore the engineering');
  assert.equal(visitor.stack.includes('TimescaleDB'), false);
  assert.equal(visitor.prototype, undefined);
  assert.equal(visitor.scale, undefined);
});

test('metrics strip leads with Ovee, the primary story', () => {
  assert.equal(metrics.kicker, hero.proofLabel);
  assert.equal(metrics.kicker, 'Delivery proof');
  assert.deepEqual(
    metrics.items.map((item) => [item.value, item.label]),
    [
      ['4', 'Live events, Asia & Europe'],
      ['0', 'Off-message incidents on stage'],
      ['~5 s', 'Workshop synthesis, vs ~30 min by hand'],
    ],
  );
  assert.equal(metrics.footnote, hero.proof);
  assert.match(metrics.footnote, /600 leaders/);
  assert.match(metrics.footnote, /Ovee/);
  assert.equal(metrics.footnote.includes('Live-event AI'), false);
  assert.equal(metrics.footnote.includes('Separately'), false);
  assert.equal(metrics.kicker.includes('Most recent'), false);
  assert.equal(metrics.footnote.includes('Same-day'), false);
  assert.equal(metrics.footnote.includes('briefed to live'), false);
});

test('about, experience and contact match V4.1', () => {
  assert.equal(about.body[0], 'I’m Hermenegildo—Gildo for short—a full-stack AI engineer based in Portugal.');
  assert.equal(experience.title, 'Full Stack Engineer');
  assert.equal(experience.company, 'Dorier');
  assert.equal(experience.period, '2025–present');
  assert.match(experience.items[2], /within the wider event delivery/);
  assert.equal(contact.heading, 'Let’s talk about what you’re building.');
  assert.equal(site.email, 'hermeny7@hotmail.com');
  assert.equal(site.github, 'https://github.com/HermenySantos');
  assert.equal(site.linkedin, 'https://www.linkedin.com/in/hermenegildosantos');
  assert.equal(site.title, 'Hermenegildo Santos | Full-Stack AI Engineer · Real-Time & Human-in-the-Loop Systems');
  assert.equal(
    site.description,
    'Full-stack AI engineer in Portugal building real-time, human-in-the-loop AI systems and interactive platforms. Explore delivered work and the engineering decisions behind it.',
  );
});

test('case prose keeps engineering substance and supplied headings', () => {
  const slugs = ['ai', 'visitor', 'webar', 'concierge'] as const;
  const files = Object.fromEntries(
    slugs.map((slug) => [slug, readFileSync(join('content/cases', `${slug}.md`), 'utf8')]),
  );

  assert.match(files.ai, /Ovee — live-event AI with a human in control/);
  assert.match(files.ai, /four live events/);
  assert.match(files.ai, /600 participants across 60 roundtables/);
  assert.match(files.ai, /approximately five seconds/);
  assert.equal(files.ai.includes('## What I delivered'), false);
  assert.match(files.ai, /within \*\*12 seconds\*\*/);
  assert.match(files.ai, /## Two interfaces, one live experience/);
  assert.match(files.ai, /## A draft needs permission to reach the stage/);
  assert.match(files.ai, /## One response, one playback start/);
  assert.match(files.ai, /suppresses the same version within \*\*1\.5 seconds\*\*/);
  assert.match(files.ai, /can also suppress an intentional replay/);
  assert.match(files.ai, /## Recovering from missed notifications and blocked audio/);
  assert.match(files.ai, /pending flag requests another fetch/);
  assert.match(files.ai, /Separately from the 600-person summit/);
  assert.match(files.ai, /six captured stage sessions/);
  assert.match(files.ai, /163 contributions/);
  assert.equal(files.ai.includes('An AI response is not ready just because the model finished'), false);

  assert.match(files.visitor, /^# Coordinating an immersive visitor experience across rooms and devices\n/);
  assert.match(files.visitor, /\*\*Immersive visitor platform · UN Geneva Visitor Centre · Dorier · 2025–2026\*\*/);
  assert.match(files.visitor, /## From arrival to a shared decision/);
  assert.match(files.visitor, /## My responsibility/);
  assert.match(files.visitor, /## How the platform fits together/);
  assert.match(files.visitor, /## Keeping positioning inside the visitor app/);
  assert.match(files.visitor, /## Keeping audio aligned with the experience/);
  assert.match(files.visitor, /## Making tour ownership part of the client–server contract/);
  assert.match(files.visitor, /## Carrying language and content through the stack/);
  assert.match(files.visitor, /## Giving staff tools to operate the system/);
  assert.match(files.visitor, /## Making the platform understandable after handover/);
  assert.match(files.visitor, /## Additional engineering: a tour flight recorder/);
  assert.match(files.visitor, /\*\*Development-branch implementation; production rollout is not confirmed\.\*\*/);
  assert.match(files.visitor, /## What this work demonstrates/);
  const visitorHeadings = [...files.visitor.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  assert.equal(visitorHeadings.at(-2), 'Additional engineering: a tour flight recorder');
  assert.equal(visitorHeadings.at(-1), 'What this work demonstrates');
  const audioAt = files.visitor.indexOf('## Keeping audio aligned with the experience');
  const ownershipAt = files.visitor.indexOf('## Making tour ownership part of the client–server contract');
  for (const heading of [
    '### Correcting drift and stale volume changes',
    '### Recovering when headphones reconnect',
    '### Handling visitors who are already in place',
  ]) {
    const at = files.visitor.indexOf(heading);
    assert.ok(at > audioAt && at < ownershipAt, heading);
  }
  assert.equal(files.visitor.includes('```'), false);
  assert.equal(files.visitor.includes('TimescaleDB'), false);
  assert.equal(files.visitor.includes('Fondation'), false);
  assert.equal(files.visitor.includes('Portail des Nations'), false);
  assert.match(files.webar, /Approximately 2,100 participants/);
  const huntAt = files.webar.indexOf('## An event space became a character hunt');
  const responsibilityAt = files.webar.indexOf('## My responsibility');
  assert.ok(huntAt > 0 && responsibilityAt > huntAt);
  assert.match(
    files.webar,
    /Participants used their phone’s browser to discover characters around the venue and choose the right props to befriend them\. Each encounter contributed to a final summary of points, characters found and completion time—without an app download\./,
  );
  assert.match(files.webar, /## Following a score from interaction to administration/);
  assert.match(files.webar, /does not itself guarantee that gameplay will progress/);
  assert.match(files.concierge, /Working prototype/);
  assert.match(files.concierge, /## Connecting conversation, monitoring and adaptation/);
  assert.match(
    files.concierge,
    /## Connecting conversation, monitoring and adaptation\n\nThe Guide and Monitor providers handle conversation and monitoring according to the runtime configuration\./,
  );
  assert.equal(files.concierge.includes('```'), false);
  assert.equal(files.concierge.includes('Visitor PWA'), false);
  assert.match(files.webar, /Those constraints connected three engineering responsibilities/);
  assert.match(files.webar, /This keeps the access pattern understandable/);
  assert.match(files.webar, /staff and participants care about the results at their own venue\./);
  assert.equal(files.webar.includes('```'), false);
  assert.equal(files.webar.includes('Phone browser / Mattercraft'), false);
  assert.equal(files.webar.includes('Show local leaderboard'), false);
  assert.match(files.concierge, /A public museum rollout remains a separate milestone/);
});

test('source tree does not reintroduce forbidden media, clients, or #18 copy', () => {
  const forbidden = [
    'DemoComputer',
    'react-globe',
    '@react-three/fiber',
    'totem-proximity-flash',
    'scopely-character-hunt',
    'pmi-ai-moderator',
    '/terms',
    '/privacy',
    'CTDorier',
    'Olympic',
    'gaia-nervous',
    'incident-free',
    'no reported incidents',
    'universal devices',
    'Walkthrough on request',
    'Most recent delivery',
    'I ship production AI',
    'SystemIllustration',
  ];

  for (const token of forbidden) {
    assert.equal(sourceBlob.includes(token), false, `forbidden token still present: ${token}`);
  }

  const layoutSource = readFileSync('lib/case-layout.ts', 'utf8');
  assert.equal(layoutSource.split('Scopely').length - 1, 2);

  const homepage = readFileSync('lib/content.ts', 'utf8');
  assert.equal(homepage.includes('TimescaleDB'), false, 'TimescaleDB must not appear in homepage content');

  for (const name of ['PMI']) {
    assert.equal(sourceBlob.includes(name), false, `client must stay unnamed: ${name}`);
  }

  const ink = readFileSync('tailwind.config.ts', 'utf8');
  assert.match(ink, /ink: '#0a0a0a'/);
  assert.equal(readFileSync('app/globals.css', 'utf8').includes('background: #0a0a0a'), true);
  assert.equal(readFileSync('components/hero.tsx', 'utf8').includes('metrics.items'), true);
  assert.equal(readFileSync('components/case-card.tsx', 'utf8').includes('rounded-[28px]'), true);
  assert.equal(cases[0].title.includes('UN'), false);
});

test('homepage cards scan scope, then bullets, then stack, then link', () => {
  const card = readFileSync('components/case-card.tsx', 'utf8');
  const summaryAt = card.indexOf('study.summary');
  const deliveredAt = card.indexOf('study.delivered');
  const stackAt = card.indexOf('study.stack');
  const ctaAt = card.indexOf('study.cta');
  assert.ok(summaryAt > 0 && deliveredAt > summaryAt);
  assert.ok(stackAt > deliveredAt);
  assert.ok(ctaAt > stackAt);
});

test('figures attach to headings and missing anchors fail', () => {
  const articles = Object.fromEntries(
    (['ai', 'visitor', 'webar', 'concierge'] as const).map((slug) => {
      const parsed = parseCaseMarkdown(readFileSync(join('content/cases', `${slug}.md`), 'utf8'));
      return [slug, buildArticle(slug, parsed.body)];
    }),
  );

  const aiMain = articles.ai.sections.filter((section) => section.figures.length > 0);
  assert.deepEqual(
    aiMain.map((section) => [section.heading, section.figures.map((figure) => figure.src)]),
    [
      [
        'My responsibility',
        ['/cases/ai/checkedin-main-stage-recurring-themes.jpg', '/cases/ai/checkedin-breakout-key-messages-audience.jpg'],
      ],
      [
        'Two interfaces, one live experience',
        ['/architecture/ovee-runtime-flow.png', '/cases/ai/04b-stage-poll-takeover-readable.png'],
      ],
      [
        'A draft needs permission to reach the stage',
        [
          '/cases/ai/06b-operator-pending-draft-awaiting-approval.png',
          '/cases/ai/06c-operator-after-approve-ovee-output.png',
        ],
      ],
      ['One response, one playback start', ['/architecture/ai-playback-desktop.png']],
      [
        'Sixty tables, one synthesis',
        ['/cases/ai/01-stage-workshop-synthesis-themes.png', '/cases/ai/02-workshop-operator-tables-submitting.png'],
      ],
    ],
  );
  assert.equal(articles.ai.sections[0]?.heading, 'My responsibility');
  assert.equal(articles.ai.sections[0]?.figures.length, 2);
  assert.equal(articles.ai.disclosure?.label, 'More product views');
  assert.deepEqual(
    articles.ai.disclosure?.figures.map((figure) => figure.src),
    [
      '/cases/ai/02b-stage-ambient-readable.png',
      '/cases/ai/02c-stage-speaking-intentional.png',
      '/architecture/ovee-wall-decision-paths.png',
    ],
  );
  assert.equal(
    articles.ai.sections.find((section) => section.heading === 'Two interfaces, one live experience')?.figures[1]?.caption,
    'Audience poll takeover in a synthetic demonstration. The 120 votes shown are sample data.',
  );
  const playbackFigure = articles.ai.sections.find((section) => section.heading === 'One response, one playback start')
    ?.figures[0];
  assert.equal(
    playbackFigure?.caption,
    'The playback guard suppresses a repeat start of the same clip version within 1.5 seconds.',
  );
  assert.equal(playbackFigure?.src, '/architecture/ai-playback-desktop.png');
  assert.deepEqual(playbackFigure?.mobile, {
    src: '/architecture/ai-playback-mobile.svg',
    width: 320,
    height: 1246,
  });

  const removed = ['04c', '05-p0', '06a', '06c-audience', '01-p0', 'ai-control', 'ai-architecture'];
  const aiSrcs = figuresFor('ai')
    .map((figure) => figure.src)
    .join('\n');
  for (const token of removed) {
    assert.equal(aiSrcs.includes(token), false, token);
  }
  assert.equal(articles.ai.disclosure?.figures.length, 3);
  assert.equal(
    aiMain.reduce((count, section) => count + section.figures.length, 0),
    9,
  );

  assert.deepEqual(
    articles.visitor.sections
      .filter((section) => section.figures.length > 0)
      .map((section) => ({
        heading: section.heading,
        figures: section.figures.map((figure) => ({
          src: figure.src,
          alt: figure.alt,
          caption: figure.caption,
          width: figure.width,
          height: figure.height,
          kind: figure.kind,
          label: figure.label,
          layout: figure.layout,
          mobile: figure.mobile,
        })),
      })),
    [
      {
        heading: 'From arrival to a shared decision',
        figures: [
          {
            src: '/architecture/visitor/visitor-journey-desktop.svg',
            alt: 'Four steps: join a scheduled tour and choose a language on the audio guide; explore with audio responding to location and show cues; cast a vote at a kiosk; see shared results. A guide tablet controls tour progression.',
            caption:
              'Visitors join a tour, explore with location-aware audio and take part in a shared voting experience. Staff coordinate the tour from a separate tablet.',
            width: 1200,
            height: 520,
            kind: 'diagram',
            label: undefined,
            layout: 'article',
            mobile: { src: '/architecture/visitor/visitor-journey-mobile.svg', width: 420, height: 1030 },
          },
          {
            src: '/cases/visitor/visitor-audio-language.png',
            alt: 'Visitor audio guide language-selection screen with English highlighted and a Confirm button.',
            caption: 'Visitors select a language on their handheld audio guide before joining the experience.',
            width: 1080,
            height: 2400,
            kind: 'screenshot',
            label: 'Visitor audio guide',
            layout: undefined,
            mobile: undefined,
          },
          {
            src: '/cases/visitor/docent-running.png',
            alt: 'Guide tablet showing a running experience, stop and reset controls, and a visitor-device table.',
            caption: 'The guide’s tablet shows the tour in progress alongside visitor-device status.',
            width: 1600,
            height: 2560,
            kind: 'screenshot',
            label: 'Guide tablet',
            layout: undefined,
            mobile: undefined,
          },
          {
            src: '/cases/visitor/kiosk-priority-vote-clean.png',
            alt: 'Visitor kiosk presenting three policy priorities for a fictional-country voting exercise.',
            caption: 'Visitors choose a policy priority as part of the shared voting experience.',
            width: 1600,
            height: 900,
            kind: 'screenshot',
            label: 'Interactive kiosk',
            layout: undefined,
            mobile: undefined,
          },
        ],
      },
      {
        heading: 'How the platform fits together',
        figures: [
          {
            src: '/architecture/visitor/visitor-coordination-desktop.svg',
            alt: 'Tour API context, show-control cues and processed indoor-positioning updates feed state coordination, which sends live state to visitor audio guides. Separately, show-control integration sends cues and results to kiosks and receives visitor choices. CMS supplies content; APIs and MQTT carry requests and live updates.',
            caption:
              'Tour context, show cues and location updates determine each visitor’s audio state. Kiosks exchange choices, presentation cues and shared results through a separate messaging flow.',
            width: 1200,
            height: 860,
            kind: 'diagram',
            label: undefined,
            layout: 'article',
            mobile: { src: '/architecture/visitor/visitor-coordination-mobile.svg', width: 420, height: 1330 },
          },
        ],
      },
      {
        heading: 'Making tour ownership part of the client–server contract',
        figures: [
          {
            src: '/architecture/visitor-docent-controller-01.png',
            alt: 'Tour takeover sequence showing ownership update, notification to the previous controller and confirmation to the new controller.',
            caption: 'The takeover flow updates the controlling device and notifies the previous controller.',
            width: 2118,
            height: 975,
            kind: 'diagram',
            label: undefined,
            layout: undefined,
            mobile: undefined,
          },
        ],
      },
      {
        heading: 'Making the platform understandable after handover',
        figures: [
          {
            src: '/cases/visitor/visitor-docs-day-in-life-excerpt.png',
            alt: 'Excerpt from Day in the Life of a Tour documentation explaining the visitor journey and the roles of the audio guide, guide tablet, kiosk and backend.',
            caption:
              'Technical handover documentation connecting the visitor journey to application behaviour and system responsibilities.',
            width: 770,
            height: 950,
            kind: 'screenshot',
            label: undefined,
            layout: 'article',
            mobile: undefined,
          },
        ],
      },
    ],
  );
  assert.equal(articles.visitor.disclosure?.label, 'Detailed system architecture');
  assert.equal(articles.visitor.disclosure?.afterHeading, 'How the platform fits together');
  assert.deepEqual(
    articles.visitor.disclosure?.figures.map((figure) => ({
      src: figure.src,
      alt: figure.alt,
      caption: figure.caption,
      kind: figure.kind,
    })),
    [
      {
        src: '/architecture/visitor-system-overview-02.png',
        alt: 'System overview connecting visitor and guide applications, kiosks, content services and external show-control and positioning systems.',
        caption:
          'Applications, content services, show control and positioning contribute to the visitor experience. My work covered application and service integration; external systems were owned by colleagues.',
        kind: 'diagram',
      },
    ],
  );
  assert.equal(
    articles.visitor.sections.some((section) =>
      section.figures.some((figure) => figure.src.includes('visitor-system-overview-02')),
    ),
    false,
  );
  assert.equal(articles.visitor.sections.find((section) => section.heading === 'My responsibility')?.figures.length, 0);
  const visitorSrcs = [
    ...articles.visitor.sections.flatMap((section) => section.figures.map((figure) => figure.src)),
    ...(articles.visitor.disclosure?.figures.map((figure) => figure.src) ?? []),
  ];
  assert.equal(new Set(visitorSrcs).size, visitorSrcs.length);
  assert.equal(statSync(join('public', 'architecture/visitor-simplified-system.svg')).isFile(), true);
  assert.equal(existsSync(join('public', 'architecture/visitor-simplified-system.png')), false);
  const layoutSource = readFileSync('lib/case-layout.ts', 'utf8');
  assert.equal(layoutSource.includes('visitor-simplified-system.png'), false);
  assert.equal(layoutSource.split('visitor-journey-desktop.svg').length - 1, 1);
  assert.equal(layoutSource.split('visitor-coordination-desktop.svg').length - 1, 1);
  for (const file of [
    'architecture/visitor/visitor-journey-desktop.svg',
    'architecture/visitor/visitor-journey-mobile.svg',
    'architecture/visitor/visitor-coordination-desktop.svg',
    'architecture/visitor/visitor-coordination-mobile.svg',
  ]) {
    assert.equal(statSync(join('public', file)).isFile(), true, file);
  }
  assert.deepEqual(
    articles.visitor.sections.map((section) => section.anchor),
    articles.visitor.sections.map((section) => headingAnchor(section.heading)),
  );
  const visitorCase = parseCaseMarkdown(readFileSync(join('content/cases', 'visitor.md'), 'utf8'));
  assert.equal(
    `${visitorCase.title} | ${site.fullName}`,
    'Coordinating an immersive visitor experience across rooms and devices | Hermenegildo Santos',
  );

  const webarPlaced = articles.webar.sections.filter((section) => section.figures.length > 0);
  assert.deepEqual(
    webarPlaced.map((section) => section.heading),
    ['An event space became a character hunt', 'Following a score from interaction to administration'],
  );
  assert.equal(webarPlaced[0]?.figures.length, 1);
  assert.equal(webarPlaced[0]?.figures[0]?.kind, 'screenshot');
  assert.equal(webarPlaced[0]?.figures[0]?.src, '/cases/webar/webar-event-lead-phone-ar.jpg');
  assert.equal(webarPlaced[0]?.figures[0]?.width, 2000);
  assert.equal(webarPlaced[0]?.figures[0]?.height, 1333);
  assert.equal(
    webarPlaced[0]?.figures[0]?.caption,
    'A participant holds a phone showing the Character Hunt AR experience over the live camera view.',
  );
  assert.equal(
    webarPlaced[0]?.figures[0]?.alt,
    'Close-up of hands holding a smartphone displaying a Monopoly character in browser AR outdoors.',
  );
  const scoreFigure = webarPlaced[1]?.figures[0];
  assert.equal(scoreFigure?.src, '/architecture/webar-data-desktop.png');
  assert.deepEqual(scoreFigure?.mobile, {
    src: '/architecture/webar-data-mobile.svg',
    width: 320,
    height: 1332,
  });
  assert.equal(scoreFigure?.kind, 'diagram');
  assert.match(scoreFigure?.caption ?? '', /location-scoped storage and leaderboards/);
  assert.equal((scoreFigure?.caption ?? '').toLowerCase().includes('not cleared'), false);
  assert.equal(articles.webar.disclosure?.label, 'Event photography');
  assert.equal(articles.webar.disclosure?.afterHeading, 'Result');
  assert.equal(articles.ai.disclosure?.afterHeading, undefined);
  const webarHeadings = articles.webar.sections.map((section) => section.heading);
  const resultAt = webarHeadings.indexOf('Result');
  assert.equal(webarHeadings[resultAt + 1], 'What I would improve next');
  assert.deepEqual(
    articles.webar.disclosure?.figures.map((figure) => ({
      src: figure.src,
      width: figure.width,
      height: figure.height,
      kind: figure.kind,
      caption: figure.caption,
      alt: figure.alt,
    })),
    [
      {
        src: '/cases/webar/webar-event-prop-choice.jpg',
        width: 2000,
        height: 1333,
        kind: 'screenshot',
        caption: 'A participant chooses a prop for a character on their phone during the event.',
        alt: 'Indoor photo of a phone screen asking which prop a Scopely game character wants.',
      },
      {
        src: '/cases/webar/webar-event-success-points.jpg',
        width: 1333,
        height: 2000,
        kind: 'screenshot',
        caption: 'A phone shows a successful character interaction and points earned in the browser experience.',
        alt: 'Hands holding a phone with a SUCCESS and 100 points overlay in the Character Hunt AR quest.',
      },
      {
        src: '/cases/webar/webar-event-signage-phones.jpg',
        width: 2000,
        height: 1333,
        kind: 'screenshot',
        caption: 'Participants use phones near Character Hunt AR Quest signage at the event.',
        alt: 'Group indoors beside an AR GAME Scopely Character Hunt AR Quest sign, several holding phones.',
      },
    ],
  );
  const photoCaptions = [
    webarPlaced[0]?.figures[0]?.caption,
    ...(articles.webar.disclosure?.figures.map((figure) => figure.caption) ?? []),
  ].join('\n');
  assert.equal(/2,100|12 locations|screenshot/i.test(photoCaptions), false);

  const conciergePlaced = articles.concierge.sections.filter((section) => section.figures.length > 0);
  assert.deepEqual(
    conciergePlaced.map((section) => ({
      heading: section.heading,
      captions: section.figures.map((figure) => figure.caption),
    })),
    [
      {
        heading: 'Connecting conversation, monitoring and adaptation',
        captions: [
          'The guide completes its response before monitoring; adaptation rules run when the turn produces a trigger. Working prototype.',
          'The diagnostic cockpit shows monitoring estimates while the adaptation gate stays quiet. Working prototype.',
        ],
      },
      {
        heading: 'When a search match is the wrong source',
        captions: [
          'The guide acknowledges missing source support and offers a suggested next step. Working prototype.',
        ],
      },
      {
        heading: 'Keeping a strategy across turns',
        captions: ['A previously selected strategy remains active without a new trigger. Working prototype.'],
      },
    ],
  );
  assert.equal(articles.concierge.disclosure, undefined);
  const conciergeTurn = articles.concierge.sections.find(
    (section) => section.heading === 'Connecting conversation, monitoring and adaptation',
  )?.figures[0];
  assert.equal(conciergeTurn?.src, '/architecture/concierge-turn-desktop.png');
  assert.deepEqual(conciergeTurn?.mobile, {
    src: '/architecture/concierge-turn-mobile.svg',
    width: 320,
    height: 1656,
  });

  assert.throws(
    () => attachFigures([], [{ afterHeading: 'What I delivered', figures: [] }]),
    /Missing figure placement anchors: What I delivered/,
  );
  assert.equal(headingAnchor('How the platform fits together'), 'how-the-platform-fits-together');

  const referenced = new Set(
    (['ai', 'visitor', 'webar', 'concierge'] as const).flatMap((slug) =>
      figuresFor(slug).flatMap((figure) => {
        const paths = [figure.src.slice(1)];
        if (figure.mobile) paths.push(figure.mobile.src.slice(1));
        return paths;
      }),
    ),
  );
  for (const src of referenced) {
    assert.equal(statSync(join('public', src)).isFile(), true, src);
  }
  const publicFiles: string[] = [];
  function walkPublic(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walkPublic(full);
      else if (/\.(png|jpe?g|webp)$/i.test(entry)) publicFiles.push(full.split('public/').pop() ?? full);
    }
  }
  walkPublic('public');
  for (const file of publicFiles) {
    if (file === 'assets/og-image.png') continue;
    assert.equal(referenced.has(file), true, `${file} is not attached to a case section`);
  }
  const joined = publicFiles.join('\n');
  for (const blocked of [
    'visitor-language',
    'visitor-tour-takeover',
    'ai-control',
    'ai-architecture',
    'Pending brand clearance',
  ]) {
    assert.equal(joined.includes(blocked), false, blocked);
  }
  assert.equal(sourceBlob.includes('Pending brand clearance'), false);
});

test('case pages attach figures inside sections, then keep contact navigation', () => {
  const page = readFileSync('app/cases/[slug]/page.tsx', 'utf8');
  const article = readFileSync('components/case-article.tsx', 'utf8');
  const media = readFileSync('components/case-media.tsx', 'utf8');
  const titleAt = page.indexOf('full.title');
  const roleAt = page.indexOf('full.roleLine');
  const articleAt = page.indexOf('<CaseArticle');
  const contactAt = page.indexOf('Get in touch');
  assert.ok(titleAt > 0 && roleAt > titleAt);
  assert.ok(articleAt > roleAt);
  assert.ok(contactAt > articleAt);
  assert.match(page, /study\.title/);
  assert.match(page, /Working prototype/);
  assert.equal(page.includes('full.title'), true);
  assert.equal(page.includes('full.architecture'), false);
  assert.equal(page.includes('w-[1800px]'), false);
  assert.equal(page.includes('aspect-video'), false);

  const sectionAt = article.indexOf('article.sections.map');
  const figuresAt = article.indexOf('section.figures');
  const disclosureAt = article.indexOf('<details');
  assert.ok(sectionAt > 0 && figuresAt > sectionAt);
  assert.ok(disclosureAt > figuresAt);
  assert.equal(/<details[^>]*\sopen/.test(article), false);
  assert.match(article, /disclosure\.label/);
  assert.match(article, /afterHeading/);
  assert.match(readFileSync('lib/case-layout.ts', 'utf8'), /More product views/);
  assert.match(media, /Open full-size diagram/);
  assert.match(media, /Open full-size image/);
  assert.match(media, /w-full/);
  assert.match(media, /max-w-\[440px\]/);
  assert.match(page, /constrainPortraits=\{slug === 'visitor' \|\| slug === 'concierge' \|\| slug === 'webar'\}/);
  assert.equal(media.includes('max-w-none'), false);
  assert.equal(media.includes('Pending brand clearance'), false);
  assert.match(media, /priority/);
  assert.match(media, /figure\.label/);
  assert.equal(media.includes('sourceHref'), false);
  assert.equal(media.includes('Open editable source'), false);
  assert.match(media, /figure\.layout !== 'article'/);
  assert.match(media, /max-width: 767px/);
  assert.match(media, /<picture/);
  assert.equal(media.includes('object-cover'), false);
  assert.equal(media.includes('object-fit'), false);
  assert.match(
    page,
    /Engineering an immersive visitor platform across React Native, native Android, Go and content services: location-aware audio, tour control and technical handover\./,
  );
  assert.match(page, /slug === 'visitor'/);
  assert.match(page, /\$\{full\.title\} \| \$\{site\.fullName\}/);
  assert.match(page, /images: \[\{ url: site\.ogImage, alt: site\.title \}\]/);
  assert.match(page, /card: 'summary_large_image'/);
  assert.match(page, /images: \[site\.ogImage\]/);

  const header = readFileSync('components/header.tsx', 'utf8');
  assert.match(header, /event\.key !== 'Escape'/);
  assert.match(header, /menuToggleRef\.current\?\.focus\(\)/);
  assert.match(header, /ref=\{menuToggleRef\}/);
});
