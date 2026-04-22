import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Cosmic Match'

const WelcomeWaitlistEmail = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>The stars have aligned — you're on the {SITE_NAME} waitlist ✨</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={hero}>
          <Text style={sparkle}>✦ ✦ ✦</Text>
          <Heading style={h1}>Welcome, traveler.</Heading>
          <Text style={subheading}>
            Your cosmic invitation is on its way.
          </Text>
        </Section>

        <Section style={content}>
          <Text style={text}>
            Thank you for joining the {SITE_NAME} waitlist. The stars have noted
            your name, and your place is reserved among the first to discover
            connections written in the cosmos.
          </Text>
          <Text style={text}>
            We're crafting something special — a place where ancient wisdom
            meets modern matchmaking. Compatibility guided not by algorithms
            alone, but by the celestial patterns that have shaped human
            connection for millennia.
          </Text>
          <Text style={text}>
            You'll be among the first to know when we open the gates.
          </Text>
        </Section>

        <Section style={divider}>
          <Text style={dividerText}>✦</Text>
        </Section>

        <Section style={footerSection}>
          <Text style={footerText}>
            With cosmic regards,
            <br />
            The {SITE_NAME} Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeWaitlistEmail,
  subject: 'Welcome to Cosmic Match ✨',
  displayName: 'Waitlist welcome',
  previewData: {},
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 24px',
  backgroundColor: '#ffffff',
}

const hero: React.CSSProperties = {
  textAlign: 'center',
  padding: '32px 24px',
  background: 'linear-gradient(135deg, #fdf8ec 0%, #f7eed3 100%)',
  borderRadius: '16px',
  border: '1px solid #ead9a8',
}

const sparkle: React.CSSProperties = {
  fontSize: '14px',
  color: '#c9a45c',
  letterSpacing: '8px',
  margin: '0 0 12px',
}

const h1: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: '36px',
  fontWeight: 600,
  color: '#1a1730',
  margin: '0 0 8px',
  letterSpacing: '-0.01em',
}

const subheading: React.CSSProperties = {
  fontSize: '15px',
  color: '#6b5f3d',
  margin: 0,
  fontStyle: 'italic',
}

const content: React.CSSProperties = {
  padding: '32px 8px 8px',
}

const text: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#3d3856',
  margin: '0 0 18px',
}

const divider: React.CSSProperties = {
  textAlign: 'center',
  padding: '16px 0',
}

const dividerText: React.CSSProperties = {
  fontSize: '16px',
  color: '#c9a45c',
  margin: 0,
}

const footerSection: React.CSSProperties = {
  padding: '8px 8px 16px',
}

const footerText: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b6580',
  margin: 0,
  lineHeight: '1.6',
}
