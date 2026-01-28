

# Personal Brand Website for 宋德明 (Deming Song)

## Overview
A bilingual (English/Chinese) personal resume website with Matrix-inspired dark theme and code rain effects. Designed for 30-60 second scanning by executives, tech leads, and potential consulting clients.

---

## Visual Design & Technical Effects

### Theme
- **Dark mode primary** with deep navy/black background
- Matrix-style animated code rain particles in the background
- Glowing accent colors (cyan/green terminal colors)
- Subtle scan lines and terminal aesthetic

### Technical Effects
- Animated particle system with falling code characters
- Typing effect for the hero positioning statement
- Smooth reveal animations on scroll
- Hover effects with glow/pulse on interactive elements
- Smooth scroll navigation with active section highlighting

---

## Page Structure

### 1. Navigation Bar
- Minimal sticky header
- Language toggle (EN/中文) with smooth transition
- Anchor links to each section

### 2. Hero Section
**English:**
> "15 years shipping high-scale systems. From 2M+ connected devices to 40+ government bureaus—I architect solutions that perform under pressure."

**Chinese:**
> "15年高并发系统架构经验。从200万+物联网设备接入到40+政府委办局共用平台——我专注于构建高性能、可扩展的技术解决方案。"

- Subtle code rain animation behind text
- Contact email visible
- "Let's Talk" CTA button

### 3. Credibility Snapshot
Quick-scan metrics:
- **15 Years** Java Architecture & Development
- **8 Years** GIS/Digital Twin Systems
- **10+ Years** Internet-Scale Platforms
- **20+ People** Team Leadership Experience

Key domains (icon bullets):
- High Concurrency (100k QPS gateway experience)
- Cloud Native (K8s, Docker, Istio)
- IoT & Real-time (MQTT, million-device connections)
- Geospatial Systems (ArcGIS, PostGIS, 3D tiling)

### 4. Selected Case Studies (3 Featured)

#### Case 1: MYA Cards Global Platform
- **Context:** Education + gaming card trading platform, dual-region (overseas + China)
- **My Role:** Chief Architect / Tech Lead
- **Actions:** Designed global API gateway for multi-region routing; built card ownership verification system (<200ms); completed dual-cloud migration in 1 week
- **Outcome:** 0-to-1 platform launch in 5 months, 99.95% uptime, <0.1% complaint rate

#### Case 2: Shanghai Smart City GIS Platform
- **Context:** City-level spatial data infrastructure serving 40+ government bureaus
- **My Role:** Senior Architect (led 2-person R&D team)
- **Actions:** Architected GeoScene + 3D tile + MinIO stack; authored feasibility report
- **Outcome:** Image processing 18h→2h (9x faster); secured 40M CNY government funding

#### Case 3: IoT Platform (Gas IoT)
- **Context:** Enterprise IoT for 2M+ gas meters and 300k alarms
- **My Role:** Senior Tech Manager (led 6-person team)
- **Actions:** Built million-connection gateway (Netty + MQTT); implemented sharding for message ordering
- **Outcome:** 10x QPS improvement (1k→10k); <0.01% message disorder rate

### 5. How I Work
6 concise principles:
1. Start with constraints, not features—production reality shapes architecture
2. Measure first, optimize second—data-driven decisions
3. Build for scale, ship for speed—pragmatic trade-offs
4. Document decisions, not just code—institutional knowledge matters
5. Hands-on when needed—not afraid to debug at 2am
6. Clear communication—translate tech complexity for stakeholders

### 6. Experience Timeline
Condensed visual timeline or role clusters:
- **2024–Present:** Chief Architect, MYA Cards
- **2020–2023:** Senior Tech Manager, Gas IoT Platform
- **2018–2020:** Senior Dev Manager, Hanwei E-commerce (30M GMV)
- **2016–2018:** Advertising Platform Lead, Wanda/Feifan (10-person team)
- **2015–2016:** Tech Manager, Suning Advertising
- **2011–2015:** GIS/Government Systems, Various Roles

**Education:** Master's in GIS, China Agricultural University (2007)

### 7. Call to Action
Professional, low-pressure:
> "Building something complex? Let's talk architecture."
- Email link
- Optional: LinkedIn or GitHub links
- Simple contact form (name, email, brief message)

---

## Technical Implementation

### Core Features
- React + TypeScript + Tailwind CSS (current stack)
- Canvas-based or CSS particle animation for code rain effect
- i18n for English/Chinese language switching
- Single-page scroll with section anchors
- Responsive design (mobile-friendly)

### Performance
- Optimized animations (reduced motion media query support)
- Lazy load sections below fold
- Minimal dependencies for GitHub Pages compatibility

### Future-Ready Structure
- Modular component design for easy expansion
- Prepared routing structure for future pages (blog, projects, talks)
- Clean data separation (content in JSON/constants for easy updates)

---

## Deliverables
1. Landing page with all 7 sections
2. Language toggle with full bilingual content
3. Matrix-style code rain background animation
4. Responsive layout for desktop and mobile
5. Contact section with email link and optional form

