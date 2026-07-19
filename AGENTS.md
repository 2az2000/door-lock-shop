# AGENTS.md

# Door Lock & Handle Catalog Website

## Project Overview

This project is a modern product catalog website for a company selling door handles, locks, cylinders, accessories and related hardware.

This is **NOT** an e-commerce platform.

Customers cannot purchase products online.

The website is designed to showcase products, specifications, prices and company information while allowing administrators to manage all content through Payload CMS.

The website language is **Persian (Farsi)** and follows **RTL** layout by default.

---

# Main Goals

- Modern Premium UI
- Fast Performance
- Excellent SEO
- Easy Product Management
- Responsive Design
- Clean Architecture
- Future Scalability

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- TailwindCSS v4
- shadcn/ui
- Framer Motion
- Lucide Icons
- React Hook Form
- Zod
- next-themes

## CMS

- Payload CMS 3

## Database

- PostgreSQL

## Image Processing

- Sharp

---

# Website Type

Product Catalog

NOT Marketplace

NOT E-Commerce

---

# Supported Language

Primary Language:

Persian (Farsi)

Layout:

RTL

Future support for English should be possible without changing the architecture.

---

# Design Philosophy

The website should feel:

- Premium
- Luxury
- Modern
- Minimal
- Clean
- Elegant

Avoid old-fashioned layouts.

Avoid excessive colors.

Avoid unnecessary animations.

Every page should look professional.

---

# UI Inspiration

Design should be inspired by:

- Apple
- Herman Miller
- IKEA
- Hafele
- Kohler

Large spacing.

Large images.

Minimal borders.

Soft shadows.

Rounded corners.

Professional typography.

---

# Design System

## Spacing

Always use consistent spacing.

Never use random values.

Use Tailwind spacing scale.

Example

4
8
12
16
24
32
48
64

---

## Border Radius

Use large rounded corners.

Cards

rounded-xl

or

rounded-2xl

Buttons

rounded-lg

Images

rounded-xl

---

## Shadows

Soft shadows only.

Never use heavy shadows.

---

## Colors

Use neutral colors.

Primary colors should come from theme variables.

Never hardcode colors inside components.

Always use CSS variables.

---

## Typography

Use Vazirmatn.

Hierarchy:

Hero

Heading

Subheading

Body

Caption

Keep typography consistent.

---

## Icons

Only use Lucide Icons.

Never mix icon libraries.

---

## Images

Product images are the most important content.

Requirements:

High Quality

Optimized

WebP

Lazy Loading

Consistent Ratio

---

# Motion

Use Framer Motion.

Animations should be subtle.

Maximum duration:

300ms

Avoid flashy animations.

No unnecessary bouncing.

Prefer fade

slide

scale

---

# Responsive Rules

Desktop First Design

Support

Desktop

Laptop

Tablet

Mobile

Never break layouts.

---

# Accessibility

Use semantic HTML.

All images must include alt text.

Buttons must have accessible labels.

Maintain sufficient color contrast.

Keyboard navigation should work.

---

# SEO Rules

Every page must have:

Title

Description

Canonical URL

OpenGraph

Twitter Metadata

Structured Data

Breadcrumbs

Sitemap

Robots.txt

---

# Performance Rules

Prefer Server Components.

Minimize Client Components.

Lazy load heavy components.

Optimize all images.

Avoid unnecessary JavaScript.

Keep Lighthouse score above 90.

---

# Architecture

Frontend and CMS must remain independent.

Never tightly couple UI with Payload.

The frontend should consume CMS data through typed services.

---

# Folder Structure

```
src/

app/

components/
ui/
layout/
common/
product/
category/

features/

services/

hooks/

lib/

types/

utils/

styles/

constants/

providers/

actions/
```

CMS

```
payload/

collections/

globals/

hooks/

access/

fields/

utils/
```

---

# Component Rules

Each component must have one responsibility.

Avoid giant components.

Reusable components belong inside:

components/ui

Business components belong inside:

components/product

components/category

---

# State Management

Prefer:

Server Components

URL Search Params

React State

Avoid global state unless necessary.

---

# Data Fetching

Always use Server Components when possible.

Use caching.

Use ISR where appropriate.

Avoid unnecessary client fetching.

---

# Product Model

Every product should include:

- title
- slug
- shortDescription
- fullDescription
- category
- gallery
- featuredImage
- brand
- price
- priceLabel
- specifications
- colors
- materials
- dimensions
- weight
- featured
- published
- seoTitle
- seoDescription
- createdAt
- updatedAt

---

# Category Model

- title
- slug
- image
- description
- order

---

# Site Settings

Global settings should include:

Company Name

Logo

Phone

Mobile

WhatsApp

Email

Address

Google Map

Instagram

Telegram

Working Hours

Footer Text

SEO Defaults

---

# Product Page

Each product page should contain:

Gallery

Breadcrumb

Title

Price

Specifications

Description

Related Products

Contact CTA

---

# Home Page

Hero

Categories

Featured Products

Company Introduction

Why Choose Us

Brands

Latest Products

Contact Section

Footer

---

# Product Listing

Support:

Search

Category Filter

Brand Filter

Price Display

Sorting

Pagination

---

# Contact Page

Contact Form

Phone Numbers

Address

Google Map

Business Hours

Social Media

---

# Admin Responsibilities

The client should manage:

Products

Categories

Images

Prices

Company Information

SEO Fields

No developer should be required for content updates.

---

# Coding Standards

Use TypeScript strictly.

Avoid any.

Prefer composition.

Keep components small.

Keep functions pure.

Avoid duplicated logic.

---

# Naming Convention

Components

PascalCase

Hooks

useSomething

Utilities

camelCase

Constants

UPPER_CASE

---

# Git Rules

Small commits.

Meaningful commit messages.

One feature per branch.

---

# Future Scalability

Architecture should support future additions:

Authentication

Online Shopping

Payment Gateway

Inventory

Multi Language

Blog

News

Wishlist

Quotation Requests

Dealer Panel

Without major refactoring.

---

# Don't

- Don't hardcode colors
- Don't hardcode strings
- Don't use inline styles
- Don't create huge components
- Don't duplicate code
- Don't fetch data inside deeply nested components
- Don't ignore accessibility
- Don't ignore SEO
- Don't use low-quality images

---

# Definition of Done

A feature is complete only if:

✅ Responsive

✅ Accessible

✅ SEO Ready

✅ Optimized

✅ Typed

✅ Reusable

✅ Tested

✅ Clean Code

✅ Matches Design System

✅ Production Ready