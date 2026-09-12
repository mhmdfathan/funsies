# Product requirements: Grassroots place social app

Status: Implementation baseline, revised 2026-09-12. Product name is undecided.

This revision resolves the review findings using product defaults selected at the user's request. These defaults are decisions for the first build, not claims that every detail was previously specified by the founder. [TECHNICAL_SPEC.md](TECHNICAL_SPEC.md) defines implementation and verification.

## 1. Product and audience

A social app combining the place ratings of Google Reviews, visual sharing associated with Instagram, and short conversations associated with Twitter. Everyday people discover nearby food and drink venues through people they follow and the wider community. Each visit has its own report and rating; readers can see the context behind a place's average.

Everyone starts with the same account capabilities. Influence develops through useful contributions and followers. There is no purchased or assigned influencer ranking tier.

The first release supports food and drink venues globally, with English interface copy and Unicode user content. Coverage grows through user-created listings. A seeded city is helpful for promotion but is not a requirement or restriction on signup. In an empty area, people can add places or explicitly widen their search.

## 2. Scope and delivery boundary

All rows marked MVP are required for the first complete release. Delivery phases in the technical spec are an implementation order, not separate product commitments.

| Capability | MVP decision |
| --- | --- |
| Accounts | Email sign-in, public reviewer profiles, optional merchant access, real names encouraged and pseudonyms allowed |
| Places | Community creation, search, branch-specific pages, manual correction and duplicate management |
| Social feed | Following and Nearby views, place-linked posts, comments, follows, saves, in-app notifications |
| Visits | One rating per visit, text and photos, context, repeat visits, editing and deletion |
| Evidence | One-time location confirmation and manually checked receipts, separately labeled |
| Guides | Ordered guides from the author's visits, practical tips, live saves |
| Merchants | Manually approved claims, place updates, public replies, reviewer-controlled text messaging |
| Advertising | Staff-managed sponsored place cards; conspicuous labeling; no self-service billing |
| Operations | Reports, blocks, moderation, appeals, account deletion, evidence review queues |

Later work: Google review imports or synchronization, external place catalog integration, native mobile apps, video, stories, reposts, quote posts, likes, automated receipt approval, inferred preferences, automated ad auctions, self-service ad billing, push notifications, and real-time chat. GDPR compliance work remains outside MVP scope per the product owner's direction. The privacy behavior below remains part of the product.

## 3. Accounts and business participation

A person has one login and a reviewer profile. Approved merchant memberships add a merchant mode; they do not require a second login. Public content always identifies whether its author is acting as a reviewer or a merchant.

A merchant organization can manage multiple places. Each place belongs to at most one approved merchant organization at a time. Owners manage staff invitations; staff may publish business updates and replies. Staff cannot transfer ownership. Platform moderators adjudicate competing claims and ownership transfers after checking business contact evidence.

Members cannot rate places managed by their organization. Their previous ratings at those places stop contributing while membership is active. Leaving does not immediately restore those ratings: a moderator must resolve the conflict. Known personal business relationships must be disclosed; undisclosed conflicts can be reported. The system cannot discover every off-platform relationship.

Real names are optional public display names. Email is private. Public profiles show contributions and followers; they do not expose private verification material.

## 4. Places and discovery

### Place directory

Reviewers search before creating a place. A listing requires name, branch address, country, coordinates, IANA timezone, and food/drink category. Cuisine tags are optional. The creator supplies the timezone with an explicit local-time preview; staff confirm it with location metadata before location verification is enabled.

New listings are immediately marked Community added and can receive reports. Similar names within 100 meters trigger a duplicate warning, not automatic merging: neighboring businesses and branches can be legitimate. A food-court unit is its own place with unit/floor details where available.

Only staff-approved location metadata enables location badges. Merchant ownership approval alone does not validate coordinates. Users submit corrections; staff approve changes to coordinates, timezone, name, address, and closure status. Closed places retain historical reports and disappear from Nearby by default. A substantial relocation gets a new place linked to its predecessor.

Staff can merge duplicate listings into a canonical place. Existing links redirect, reports and guides retain their associations, and averages are recomputed. A merge never combines different branches. Reports that become exact duplicates after a merge enter moderation with one temporarily excluded from the average.

### Feed rules

- Following shows followed reviewers' visit reports and short updates, newest first, without a distance restriction. Merchant posts have a separate place-page surface in MVP.
- Nearby uses a hard radius filter. Within that area it ranks followed reviewers first, explicit preference matches second, and broader community content third. Section labels explain those sources.
- The default view is Following when the user follows someone, otherwise Nearby. Both views are always accessible.
- Nearby defaults to 5 km; users choose 1, 5, 10, 25, or 50 km. No automatic widening. When empty, show local place listings, an Add place action, and an explicit radius control.
- A user can use location once, search an existing area, or manually enter a center. Raw device coordinates are not persisted. A chosen named area can be saved in preferences.
- Explicit cuisine choices and budget match preferences; unknown budget does not count as a match. Distance is a filter, not a hidden ranking factor. Popularity uses distinct saves on recent posts, not follower totals.
- At most two posts by one reviewer appear in each 20-item Nearby organic page. Refresh makes newer material eligible. Sparse pages are allowed; never invent activity.

## 5. Posts, visits, and ratings

### Content types

| Type | Required association | Rating contribution | Limits |
| --- | --- | --- | --- |
| Visit report | One reviewer, one place, one visit | One integer rating from 1 to 5 | 1-3,000 text characters; up to 6 photos |
| Short update | One reviewer and one place | None | 1-500 characters; up to 4 photos |
| Merchant update | An approved merchant and managed place | None | 1-1,500 characters; up to 4 photos |
| Comment or reply | One post; optional parent comment | None | 1-1,000 characters; text only |

Images accept JPEG, PNG, or WebP, at most 10 MB each before processing. Video and attachments to messages/comments are deferred. A reviewer must choose a visit date; local time is optional. Exact visit time is private. Readers see the local visit date and any deliberately supplied context.

### Repeat visits and eligibility

Every legitimate published visit contributes equally, verified or unverified. Repeat visits on the same day are allowed if the reviewer supplies distinct times. A date-only visit cannot coexist with another date-only or timed visit by the same reviewer at the same place on that date; the user must supply distinct times first. Same-minute duplicates are rejected.

Visits less than two hours apart trigger a duplicate warning and a moderation signal, not automatic removal. A reviewer can publish at most 10 visit reports per UTC day during MVP; the UI explains the limit and preserves drafts. These rules limit accidents and simple spam, not all false reports or multiple-account abuse.

Only published, non-removed visit reports from active accounts without a recorded conflict of interest contribute. A report being flagged does not by itself remove it. Moderators can hide abusive or duplicate content; hiding excludes its rating. Reinstatement restores it. Merchant requests never directly change eligibility.

Place pages show arithmetic mean rounded to one decimal, eligible visit count, unique reviewer count, five rating buckets, and recent reports. No eligible ratings means No ratings yet, not zero stars. Filtered views show their own count and average alongside a clearly labeled overall average.

### Context and money

Weekday/weekend comes from the visit's local date and place timezone. Weekend means Saturday/Sunday in MVP and is labeled accordingly. Optional context includes meal period, wait time in minutes, crowd level, and notes. Weather inference is deferred.

Spending records currency, order total, party size, and optional per-person estimate. Amounts in different currencies are never averaged or silently converted. Budget preferences use a currency and maximum per-person amount; nonmatching currencies are unknown for matching purposes.

A checked receipt supports the exact displayed order amount and checked items. Dividing by reviewer-entered party size produces an estimate, not a verified per-person amount. A guide's spending range remains author advice, with links to dated receipt-supported examples.

## 6. Evidence and its limits

### Location confirmed

The reviewer explicitly requests a check while near the place. A check uses a fresh device reading, its reported accuracy, server time, and staff-approved place coordinates. MVP thresholds are a reading no older than 60 seconds, accuracy no worse than 50 meters, and measured distance no greater than 100 meters. These are configurable launch defaults.

A successful check belongs to one reviewer, one place version, and one draft visit. It can be attached only to a visit on the check's local calendar date and, if a time is entered, within two hours of that time. Publish or attach within seven days. Otherwise the report remains publishable without the badge.

Store the outcome, server check time, venue version, and verification method. Discard raw device latitude, longitude, reported accuracy, and device timestamp after evaluation; do not include them in logs, traces, or analytics. Never show exact check time publicly. Failure produces a clear explanation and leaves posting available.

The badge says Location confirmed and explains that the submitted device location was near the venue at check time. It cannot prove consumption, identity, or prevent all location spoofing. Adjacent venues can share a radius; the badge does not assert entry into a specific unit.

### Receipt checked

Receipt upload is optional and private. A reviewer submits a receipt with a visit and confirms the proposed amount, currency, and relevant items. Staff check the venue, date, amount, and claimed items against the image. No badge appears while pending. Reject unreadable or mismatched documents with a reason and allow replacement.

The badge says Receipt checked and identifies which claims were checked. Receipt images are never public. Delete the raw image within 24 hours of a final decision; pending images expire after seven days and require resubmission. Retain only the checked fields and result while the visit exists. A keyed exact-file fingerprint detects reuse while the related receipt record exists; this does not catch all modified duplicates.

One receipt may support one active visit report in MVP. Shared-bill reviewers may still post and use location confirmation, but cannot reuse the receipt badge. Manual review is an explicit operating responsibility; staff see pending age and queue size. If review capacity is unavailable, disable new receipt uploads while retaining ordinary posting.

### Edits and evidence

Changing a place or local visit date clears both labels. Changing visit time clears location confirmation if the match no longer holds. Changing receipt-supported amount, currency, or checked items clears receipt confirmation. Text/rating/photo edits retain evidence unless they change one of those bound fields. Public revisions show which fields changed, excluding private evidence and exact time.

Changing verified place coordinates or timezone makes affected location badges unavailable pending staff reassessment; a known false check is revoked. The ordinary report stays published. Evidence uses separate labels; there is no combined visit confirmed badge.

## 7. Guides and saves

A guide contains 1-30 ordered entries sourced only from the author's published visits. Each entry includes practical tips, recommended timing, optional spending advice, and a link to its source report. Users can save places, posts, and guides privately.

Saved guides are live references to the latest published version. The guide shows an updated date and highlights changed entries on the next open. Snapshot copies, route optimization, and navigation are deferred.

If a source visit is deleted or hidden, remove its report content and rating from the entry and display Source visit unavailable. Retain the slot for the author to replace or remove; exclude it from the usable stop count. If no usable entries remain, unpublish the guide and show its savers Guide unavailable. A closed venue stays visible in the guide with a closure warning. Account deletion removes that author's guides, too.

## 8. Merchant contact, moderation, and deletion

Merchant replies and updates display the business identity. A correction request identifies a specific report and requested factual change, with at most one open request per report and merchant. Reviewers can accept, decline, or ignore it; only the reviewer edits their report.

Private messaging is one reviewer to one merchant organization, text only. The reviewer must explicitly allow that merchant or initiate the conversation. Permission is off by default. Revoking permission or blocking the merchant immediately prevents further messages. Organization members with messaging permission can read its conversations; the UI makes this clear. In-app polling and notifications are sufficient for MVP.

Users can block accounts or merchant organizations, report posts/accounts/messages, and appeal a moderation decision once within 14 days. Blocking hides the other party's content in authenticated views and prevents replies and messages; it does not change the public place average or guarantee anonymity on public pages.

Staff review reported spam, duplicated visits, impersonation, undisclosed business interests, harassment, and private information exposure. Available actions are dismiss, request correction, hide content, revoke evidence, suspend account, and approve an appeal. Staff record reasons and notify the affected author. Report counts alone do not auto-hide a review. Staff cannot moderate their own content or merchant organization.

Visit deletion immediately removes the contribution from ratings and public content. Dependent guide entries follow the unavailable-source rules. Account deletion immediately revokes sessions and hides the profile, posts, comments, guides, authored messages, and evidence. Message recipients see Message removed. Children of deleted comments retain a content-free parent placeholder. Personal data and stored media are purged within 30 days; backups expire within 35 days. Deletion remains irreversible from the user's perspective, including after a restore.

## 9. Advertising

Staff create sponsored place cards with a named advertiser, image, destination place, start/end dates, and selected area. Only approved merchant organizations can sponsor their managed places. No external tracking pixels or personalized advertising in MVP.

Nearby can show one card after each ten organic posts, at most two per 20-item page. No ad appears without eligible local inventory, and no ad appears on Following, review detail, or between rating buckets. Ads show Advertisement before the title and remain visually distinct. Organic order and averages are computed independently. Staff manage campaigns manually; billing integration is deferred.

## 10. Success and release criteria

Proposed pilot decision targets, not measured results: within the first four weeks and at least 100 activated reviewers, aim for 30% to return during days 7-13 and 40% to save a place/post/guide or open a place from the feed within seven days. An activated reviewer has selected an area and either followed someone or saved content. If the sample is smaller, report counts and postpone conclusions.

Operational release gates:

- A new user can browse an empty area, create a place, publish a visit, and receive a truthful unrated or rated place page.
- Following and Nearby obey their respective location and ordering rules.
- Concurrent edits, deletions, reinstatements, and place merges produce correct averages and guide state.
- Evidence cannot move to another user, visit, place, or unsupported date; raw coordinates and receipts do not appear publicly or in logs.
- Unauthorized business actions, self-ratings, messages without permission, and blocked contact fail on the server.
- Staff can complete a claim, receipt review, abuse report, and appeal with an audit record.
- Ads remain labeled and independent of organic rankings.
- Account deletion survives worker retries and a backup restore procedure.

No unanswered product decision blocks implementation under these defaults. Branding, real merchant/reviewer recruitment, infrastructure credentials, and actual pilot results remain operational work.
