export const layoutSlugs = ['ai', 'visitor', 'webar', 'concierge', 'seezy'] as const;

export type LayoutSlug = (typeof layoutSlugs)[number];

export type CaseFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  kind: 'screenshot' | 'diagram';
  label?: string;
  /** article keeps a tall still at column width instead of the portrait cap. */
  layout?: 'portrait' | 'article';
  /** Shown below 768px. Desktop `src` remains the fallback image. */
  mobile?: { src: string; width: number; height: number };
};

export type CaseSection = {
  heading: string;
  markdown: string;
  anchor: string;
  figures: readonly CaseFigure[];
};

export type CaseDisclosure = {
  label: 'More product views' | 'Event photography' | 'Detailed system architecture';
  figures: readonly CaseFigure[];
  afterHeading?: string;
};

export type CaseArticle = {
  preamble: string;
  sections: readonly CaseSection[];
  disclosure?: CaseDisclosure;
};

type Placement = {
  afterHeading: string;
  figures: readonly CaseFigure[];
};

function shot(
  src: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  kind: CaseFigure['kind'],
  extras?: Pick<CaseFigure, 'label' | 'layout' | 'mobile'>,
): CaseFigure {
  return { src, alt, caption, width, height, kind, ...extras };
}

const oveePlacements: readonly Placement[] = [
  {
    afterHeading: 'My responsibility',
    figures: [
      shot(
        '/cases/ai/checkedin-main-stage-recurring-themes.jpg',
        2000,
        1333,
        'Panel of three on a lit stage in front of a large LED wall showing eight recurring themes generated during the session.',
        'CheckedIn 2026, Geneva: recurring themes from the session, generated live by Ovee on the main LED wall.',
        'screenshot',
      ),
      shot(
        '/cases/ai/checkedin-breakout-key-messages-audience.jpg',
        2000,
        1333,
        'Audience facing a two-person conversation on a small stage, flanked by two screens showing key messages from the talk.',
        'A breakout session: key messages from the conversation appear on both screens while it is still under way.',
        'screenshot',
      ),
    ],
  },
  {
    afterHeading: 'Two interfaces, one live experience',
    figures: [
      shot(
        '/architecture/ovee-architecture.png',
        3040,
        1280,
        'Architecture diagram: stage audio is transcribed and drafted on the backend, but a draft reaches text-to-speech only after the operator approves it; discarded or expired drafts are dropped. Phones feed a workshop runtime whose synthesis reaches the same room wall.',
        'A draft has no path to the room except through the operator. Discarded drafts, and drafts left for 12 seconds, are dropped.',
        'diagram',
        { mobile: { src: '/architecture/ovee-architecture-mobile.svg', width: 420, height: 1306 } },
      ),
      shot(
        '/cases/ai/04b-stage-poll-takeover-readable.png',
        1920,
        1080,
        'Audience wall showing a poll takeover with result bars and a sample vote count.',
        'Audience poll takeover in a synthetic demonstration. The 120 votes shown are sample data.',
        'screenshot',
      ),
    ],
  },
  {
    afterHeading: 'A draft needs permission to reach the stage',
    figures: [
      shot(
        '/cases/ai/06b-operator-pending-draft-awaiting-approval.png',
        1440,
        900,
        'Operator screen with a generated draft waiting for approval or discard.',
        '1. A generated draft waits for the operator to approve or discard it. Synthetic demonstration.',
        'screenshot',
      ),
      shot(
        '/cases/ai/06c-operator-after-approve-ovee-output.png',
        1440,
        900,
        'Operator transcript and delivery history after a response was approved.',
        '2. After approval, the response appears in the transcript and delivery history. Synthetic demonstration.',
        'screenshot',
      ),
    ],
  },
  {
    afterHeading: 'Sixty tables, one synthesis',
    figures: [
      shot(
        '/cases/ai/01-stage-workshop-synthesis-themes.png',
        2400,
        1350,
        'Stage display titled The room’s synthesis, listing key themes and roadblocks for the question of adopting AI at work.',
        'Room synthesis on the main display. Reconstructed with synthetic data on the production build.',
        'screenshot',
      ),
      shot(
        '/cases/ai/02-workshop-operator-tables-submitting.png',
        2400,
        1350,
        'Workshop operator view with ten claimed tables and a live feed of table responses.',
        'Workshop operator view: tables claimed and contributions arriving. Reconstructed with synthetic data.',
        'screenshot',
      ),
    ],
  },
  {
    afterHeading: 'One response, one playback start',
    figures: [
      shot(
        '/architecture/ai-playback-desktop.png',
        2240,
        1926,
        'Diagram of a playback guard that suppresses a second start of the same clip version within 1.5 seconds.',
        'The playback guard suppresses a repeat start of the same clip version within 1.5 seconds.',
        'diagram',
        {
          mobile: { src: '/architecture/ai-playback-mobile.svg', width: 320, height: 1246 },
        },
      ),
    ],
  },
];

const oveeDisclosure: CaseDisclosure = {
  label: 'More product views',
  figures: [
    shot(
      '/cases/ai/02b-stage-ambient-readable.png',
      1920,
      1080,
      'Audience wall showing ambient insight cards.',
      'Ambient insights on the audience wall. Synthetic demonstration.',
      'screenshot',
    ),
    shot(
      '/cases/ai/02c-stage-speaking-intentional.png',
      1920,
      1080,
      'Audience wall in its speaking state during a text-to-speech broadcast.',
      'The wall enters its speaking state during a text-to-speech broadcast. Synthetic demonstration.',
      'screenshot',
    ),
    shot(
      '/architecture/ovee-wall-decision-paths.png',
      1400,
      620,
      'Diagram of wall priority: an active takeover over ambient content, with voice state controlling the overlay.',
      'An active takeover takes priority over ambient content; voice state controls the accompanying overlay.',
      'diagram',
      { mobile: { src: '/architecture/ovee-wall-decision-paths-mobile.svg', width: 420, height: 910 } },
    ),
  ],
};

const placements: Record<LayoutSlug, readonly Placement[]> = {
  ai: oveePlacements,
  seezy: [
    {
      afterHeading: 'One owner for the state of every process',
      figures: [
        shot(
          '/architecture/seezy-orchestrator.png',
          3200,
          1320,
          'Architecture diagram: the front end calls services through Azure API Management; each service reports its state change to one orchestrator, which owns the process from lead to completed with two administrator approval gates.',
          'Every service reports back to one orchestrator, which owns the process and its two human approval gates.',
          'diagram',
          { mobile: { src: '/architecture/seezy-orchestrator-mobile.svg', width: 420, height: 808 } },
        ),
        shot(
          '/cases/seezy/seezy-process-history.png',
          1920,
          1080,
          'Seezy admin dashboard listing three care-plan processes, each with its plan, pack, financing approval, location and current state, such as glasses delivered to the client or optician voucher validated. Client names and phone numbers are hidden.',
          'The administrator view of the orchestrator’s record: every process shows its current state and when it last moved. Client details hidden.',
          'screenshot',
        ),
      ],
    },
    {
      afterHeading: 'Shipping it, and what on-premises would cost',
      figures: [
        shot(
          '/cases/seezy/seezy-service-status.png',
          1920,
          640,
          'Seezy settings page showing the status of nine microservices: Client, Provider, Lab, Finance, Inventory, Insurance, Notification, Orchestrator and Cheque, most active and two waking up.',
          'The admin’s live view of nine of the services; two are still waking up when the page loads.',
          'screenshot',
        ),
      ],
    },
  ],
  visitor: [
    {
      afterHeading: 'My responsibility',
      figures: [
        shot(
          '/cases/visitor/together-voting-chamber.jpg',
          2000,
          1333,
          'Visitors seated in a curved negotiation chamber, voting at kiosks under blue ceiling rings.',
          'A Common Answer, the third pavilion: visitors negotiate and vote on a shared resolution. Photo: Filipe Lopes Pires.',
          'screenshot',
        ),
        shot(
          '/cases/visitor/together-exterior.jpg',
          2000,
          1500,
          'White colonnaded pavilions of the Portail des Nations among trees.',
          'The Portail des Nations pavilions in the park of the Palais des Nations. Photo: Filipe Lopes Pires.',
          'screenshot',
        ),
      ],
    },
    {
      afterHeading: 'A show that works without sound',
      figures: [
        shot(
          '/cases/visitor/docent-device-control-languages.png',
          910,
          1513,
          'Guide tablet Device Control panel with eight language options, a captions toggle switched on and a Resync Audio button. Device identifiers are blurred.',
          'Per-visitor control on the guide’s tablet: eight languages, captions, and a forced audio resync. Device identifiers blurred.',
          'screenshot',
          { label: 'Guide tablet' },
        ),
      ],
    },
    {
      afterHeading: 'The Gathering: position becomes light',
      figures: [
        shot(
          '/architecture/visitor-gathering-ramp.png',
          2400,
          920,
          'Chart: flash intensity rises linearly from off at 5 metres to full at 0.5 metres; within 0.5 metres of the totem the screen is solid white.',
          'Distance to the totem drives the flash: linear from 5 m to 0.5 m, solid white on arrival.',
          'diagram',
          { mobile: { src: '/architecture/visitor-gathering-ramp-mobile.svg', width: 420, height: 420 } },
        ),
        shot(
          '/cases/visitor/together-first-pavilion.jpg',
          2000,
          1334,
          'A long dark pavilion with projected walls and a central lit totem under a circular ceiling light.',
          'A Common Language, the first pavilion, with the central piece visitors gather around. Photo: Filipe Lopes Pires.',
          'screenshot',
        ),
      ],
    },
    {
      afterHeading: 'From arrival to a shared decision',
      figures: [
        shot(
          '/architecture/visitor/visitor-journey-desktop.svg',
          1200,
          520,
          'Four steps: join a scheduled tour and choose a language on the audio guide; explore with audio responding to location and show cues; cast a vote at a kiosk; see shared results. A guide tablet controls tour progression.',
          'Visitors join a tour, explore with location-aware audio and take part in a shared voting experience. Staff coordinate the tour from a separate tablet.',
          'diagram',
          {
            layout: 'article',
            mobile: { src: '/architecture/visitor/visitor-journey-mobile.svg', width: 420, height: 1030 },
          },
        ),
        shot(
          '/cases/visitor/journey-audio-guide.png',
          1200,
          2560,
          'Four audio-guide screens: language choice with eight languages, the welcome screen, a lobby countdown asking visitors to be at the meeting point, and the site map of the three pavilions.',
          'The visitor’s audio guide, from language choice to the meeting point. Screens from the user manual.',
          'screenshot',
          { label: 'Visitor audio guide', layout: 'article' },
        ),
        shot(
          '/cases/visitor/journey-guide-tablet.png',
          1320,
          1920,
          'Four guide-tablet screens: the lobby with a connected visitor, Experience 1 running with a timer, a prompt to lead the group to Experience 2, and the tour-end summary.',
          'The guide’s tablet runs the tour: lobby, show in progress, hand-off to the next pavilion, tour end. Screens from the user manual.',
          'screenshot',
          { label: 'Guide tablet', layout: 'article' },
        ),
        shot(
          '/cases/visitor/journey-kiosk-negotiation.png',
          2040,
          1630,
          'Five kiosk screens from the negotiation: choose a priority, receive advice from stakeholder groups, choose an amendment, vote in favour, against or abstain, and the result: agreement passed.',
          'The third pavilion’s negotiation on the kiosks: priority, advice, amendment, final vote, result. The kiosk app was built mainly by Local Projects; screens from the user manual.',
          'screenshot',
          { label: 'Voting kiosk' },
        ),
      ],
    },
    {
      afterHeading: 'How the platform fits together',
      figures: [
        shot(
          '/architecture/visitor/visitor-coordination-desktop.svg',
          1200,
          860,
          'Tour API context, show-control cues and processed indoor-positioning updates feed state coordination, which sends live state to visitor audio guides. Separately, show-control integration sends cues and results to kiosks and receives visitor choices. CMS supplies content; APIs and MQTT carry requests and live updates.',
          'Tour context, show cues and location updates determine each visitor’s audio state. Kiosks exchange choices, presentation cues and shared results through a separate messaging flow.',
          'diagram',
          {
            layout: 'article',
            mobile: { src: '/architecture/visitor/visitor-coordination-mobile.svg', width: 420, height: 1330 },
          },
        ),
      ],
    },
    {
      afterHeading: 'Making tour ownership part of the client–server contract',
      figures: [
        shot(
          '/architecture/visitor-docent-controller-01.png',
          2118,
          975,
          'Tour takeover sequence showing ownership update, notification to the previous controller and confirmation to the new controller.',
          'The takeover flow updates the controlling device and notifies the previous controller.',
          'diagram',
        ),
        shot(
          '/cases/visitor/docent-tour-taken-over.png',
          1600,
          1000,
          'Guide tablet showing a Tour Taken Over dialog: another device has taken control of this tour.',
          'What the previous guide sees: control moved to another tablet, so this one disconnects instead of competing.',
          'screenshot',
          { label: 'Guide tablet' },
        ),
      ],
    },
    {
      afterHeading: 'Making the platform understandable after handover',
      figures: [
        shot(
          '/cases/visitor/visitor-docs-day-in-life-excerpt.png',
          770,
          950,
          'Excerpt from Day in the Life of a Tour documentation explaining the visitor journey and the roles of the audio guide, guide tablet, kiosk and backend.',
          'Technical handover documentation connecting the visitor journey to application behaviour and system responsibilities.',
          'screenshot',
          { layout: 'article' },
        ),
      ],
    },
  ],
  webar: [
    {
      afterHeading: 'An event space became a character hunt',
      figures: [
        shot(
          '/cases/webar/webar-event-lead-phone-ar.jpg',
          2000,
          1333,
          'Close-up of hands holding a smartphone displaying a Monopoly character in browser AR outdoors.',
          'A participant holds a phone showing the Character Hunt AR experience over the live camera view.',
          'screenshot',
        ),
        shot(
          '/cases/webar/webar-event-prop-choice.jpg',
          2000,
          1333,
          'Indoor photo of a phone screen asking which prop a Scopely game character wants.',
          'A participant chooses a prop for a character on their phone during the event.',
          'screenshot',
        ),
        shot(
          '/cases/webar/webar-event-success-points.jpg',
          1333,
          2000,
          'Hands holding a phone with a SUCCESS and 100 points overlay in the Character Hunt AR quest.',
          'A phone shows a successful character interaction and points earned in the browser experience.',
          'screenshot',
        ),
      ],
    },
    {
      afterHeading: 'Walking, not shaking',
      figures: [
        shot(
          '/architecture/webar-anticheat.png',
          3120,
          940,
          'Decision path: sensor data is normalised across iOS and Android sampling rates, with raw sensors as a fallback; shaking is penalised only when there is walking evidence and the shake lasts at least 200 milliseconds; otherwise movement counts as normal play.',
          'Shaking costs energy only when the phone is also walking and the shake is sustained, so honest players are not punished for a bump.',
          'diagram',
          { mobile: { src: '/architecture/webar-anticheat-mobile.svg', width: 420, height: 644 } },
        ),
      ],
    },
    {
      afterHeading: 'A small backend, made defensible',
      figures: [
        shot(
          '/architecture/webar-data-desktop.png',
          2240,
          1990,
          'Diagram of scores passing through the API into location-scoped storage and leaderboards.',
          'Scores pass through the API into location-scoped storage and leaderboards.',
          'diagram',
          {
            mobile: { src: '/architecture/webar-data-mobile.svg', width: 320, height: 1332 },
          },
        ),
      ],
    },
  ],
  concierge: [
    {
      afterHeading: 'Two agents talk and watch; rules decide',
      figures: [
        shot(
          '/architecture/concierge-turn-desktop.png',
          2240,
          2372,
          'Diagram of a concierge turn: the guide responds, then monitoring runs, and adaptation rules run when the turn produces a trigger.',
          'The guide completes its response before monitoring; adaptation rules run when the turn produces a trigger. Working prototype.',
          'diagram',
          {
            mobile: { src: '/architecture/concierge-turn-mobile.svg', width: 320, height: 1656 },
          },
        ),
        shot(
          '/cases/concierge/concierge-04-monitor-gate-quiet.png',
          1036,
          1716,
          'Diagnostic cockpit with monitoring estimates and a quiet adaptation gate.',
          'The diagnostic cockpit shows monitoring estimates while the adaptation gate stays quiet. Working prototype.',
          'screenshot',
        ),
      ],
    },
    {
      afterHeading: 'When a visitor drifts, rules decide what happens',
      figures: [
        shot(
          '/cases/concierge/concierge-visitor-spark.png',
          1100,
          470,
          'A visitor-facing card titled Find the hidden chain, offering to link the last three things the visitor looked at.',
          'What a triggered intervention looks like to the visitor: a small, optional spark rather than a lecture. Working prototype.',
          'screenshot',
        ),
        shot(
          '/cases/concierge/concierge-05-strategy-carryover.png',
          1036,
          1716,
          'Diagnostic cockpit showing a previously selected strategy still active, with no new trigger.',
          'A previously selected strategy remains active without a new trigger. Working prototype.',
          'screenshot',
        ),
      ],
    },
  ],
};

const webarDisclosure: CaseDisclosure = {
  label: 'Event photography',
  afterHeading: 'Result',
  figures: [
    shot(
      '/cases/webar/webar-event-signage-phones.jpg',
      2000,
      1333,
      'Group indoors beside an AR GAME Scopely Character Hunt AR Quest sign, several holding phones.',
      'Participants use phones near Character Hunt AR Quest signage at the event.',
      'screenshot',
    ),
  ],
};

const visitorDisclosure: CaseDisclosure = {
  label: 'Detailed system architecture',
  afterHeading: 'How the platform fits together',
  figures: [
    shot(
      '/architecture/visitor-system-overview.png',
      3120,
      1280,
      'System overview: indoor positioning, guide-tablet commands and show cues merge in one State Manager, which sends one state per visitor to each audio guide over MQTT; the CMS supplies content; voting kiosks follow show cues on a separate path.',
      'Every input merges in one State Manager, which publishes one state per visitor. Show control, positioning hardware and the kiosks’ show integration were owned by colleagues.',
      'diagram',
      { mobile: { src: '/architecture/visitor-system-overview-mobile.svg', width: 420, height: 802 } },
    ),
  ],
};

const disclosures: Partial<Record<LayoutSlug, CaseDisclosure>> = {
  ai: oveeDisclosure,
  webar: webarDisclosure,
  visitor: visitorDisclosure,
};

export function parseCaseMarkdown(markdown: string): { title: string; roleLine: string; body: string } {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines[0]?.replace(/^#\s+/, '') ?? '';
  let index = 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  const roleLine = (lines[index] ?? '').replace(/^\*\*|\*\*$/g, '');
  index += 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  return {
    title,
    roleLine,
    body: lines.slice(index).join('\n'),
  };
}

export function headingAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function splitCaseSections(body: string): {
  preamble: string;
  sections: { heading: string; markdown: string }[];
} {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const preambleLines: string[] = [];
  const sections: { heading: string; lines: string[] }[] = [];
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      current = { heading: line.slice(3).trim(), lines: [line] };
      sections.push(current);
      continue;
    }
    if (current) current.lines.push(line);
    else preambleLines.push(line);
  }

  return {
    preamble: preambleLines.join('\n').trim(),
    sections: sections.map((section) => ({
      heading: section.heading,
      markdown: section.lines.join('\n').trim(),
    })),
  };
}

export function attachFigures(
  sections: readonly { heading: string; markdown: string }[],
  sectionPlacements: readonly Placement[],
): CaseSection[] {
  const seen = new Set<string>();
  for (const section of sections) {
    if (seen.has(section.heading)) {
      throw new Error(`Duplicate case heading: ${section.heading}`);
    }
    seen.add(section.heading);
  }

  const byHeading = new Map(sectionPlacements.map((placement) => [placement.afterHeading, placement.figures]));
  const attached = new Set<string>();
  const result = sections.map((section) => {
    const figures = byHeading.get(section.heading) ?? [];
    if (byHeading.has(section.heading)) attached.add(section.heading);
    return {
      heading: section.heading,
      markdown: section.markdown,
      anchor: headingAnchor(section.heading),
      figures,
    };
  });

  const missing = [...byHeading.keys()].filter((heading) => !attached.has(heading));
  if (missing.length > 0) {
    throw new Error(`Missing figure placement anchors: ${missing.join(', ')}`);
  }
  return result;
}

export function buildArticle(slug: LayoutSlug, body: string): CaseArticle {
  const placementsForSlug = placements[slug];
  if (!placementsForSlug) {
    throw new Error(`No figure placements for ${slug}`);
  }
  const split = splitCaseSections(body);
  const disclosure = disclosures[slug];
  if (disclosure?.afterHeading && !split.sections.some((section) => section.heading === disclosure.afterHeading)) {
    throw new Error(`Missing disclosure anchor: ${disclosure.afterHeading}`);
  }
  return {
    preamble: split.preamble,
    sections: attachFigures(split.sections, placementsForSlug),
    disclosure,
  };
}

export function figuresFor(slug: LayoutSlug): readonly CaseFigure[] {
  const articleFigures = placements[slug].flatMap((placement) => placement.figures);
  const extra = disclosures[slug]?.figures ?? [];
  return [...articleFigures, ...extra];
}
