from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import flowables

# ── Colour palette ──────────────────────────────────────────────────────────
NAVY      = colors.HexColor("#1A237E")
BLUE      = colors.HexColor("#1565C0")
LIGHT_BLUE= colors.HexColor("#E3F2FD")
ACCENT    = colors.HexColor("#0288D1")
TEAL      = colors.HexColor("#00796B")
TEAL_LIGHT= colors.HexColor("#E0F2F1")
GREEN     = colors.HexColor("#2E7D32")
GREEN_LIGHT=colors.HexColor("#E8F5E9")
ORANGE    = colors.HexColor("#E65100")
ORANGE_LIGHT=colors.HexColor("#FFF3E0")
PURPLE    = colors.HexColor("#6A1B9A")
PURPLE_LIGHT=colors.HexColor("#F3E5F5")
RED       = colors.HexColor("#B71C1C")
RED_LIGHT = colors.HexColor("#FFEBEE")
GRAY_DARK = colors.HexColor("#37474F")
GRAY_MID  = colors.HexColor("#78909C")
GRAY_LIGHT= colors.HexColor("#ECEFF1")
WHITE     = colors.white

# ── Styles ───────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

cover_title = S("CoverTitle",
    fontName="Helvetica-Bold", fontSize=30, textColor=WHITE,
    alignment=TA_CENTER, spaceAfter=6, leading=36)

cover_sub = S("CoverSub",
    fontName="Helvetica", fontSize=14, textColor=colors.HexColor("#BBDEFB"),
    alignment=TA_CENTER, spaceAfter=4)

cover_note = S("CoverNote",
    fontName="Helvetica-Oblique", fontSize=11, textColor=WHITE,
    alignment=TA_CENTER, spaceAfter=4)

section_header = S("SectionHeader",
    fontName="Helvetica-Bold", fontSize=15, textColor=WHITE,
    alignment=TA_LEFT, spaceAfter=2, spaceBefore=4,
    leftIndent=8, leading=20)

sub_header = S("SubHeader",
    fontName="Helvetica-Bold", fontSize=12, textColor=NAVY,
    spaceAfter=3, spaceBefore=6, leading=16)

body = S("Body",
    fontName="Helvetica", fontSize=10, textColor=GRAY_DARK,
    spaceAfter=3, leading=15, alignment=TA_JUSTIFY)

bullet_style = S("Bullet",
    fontName="Helvetica", fontSize=10, textColor=GRAY_DARK,
    spaceAfter=2, leading=14, leftIndent=14, bulletIndent=4)

code_style = S("Code",
    fontName="Courier", fontSize=9.5, textColor=colors.HexColor("#212121"),
    backColor=colors.HexColor("#F5F5F5"), spaceAfter=4, leading=14,
    leftIndent=10, borderPadding=(4,6,4,6))

tip_style = S("Tip",
    fontName="Helvetica-Oblique", fontSize=9.5, textColor=GREEN,
    spaceAfter=2, leading=14, leftIndent=8)

warn_style = S("Warn",
    fontName="Helvetica-Oblique", fontSize=9.5, textColor=ORANGE,
    spaceAfter=2, leading=14, leftIndent=8)

page_width, page_height = A4

# ── Helpers ──────────────────────────────────────────────────────────────────
def hr(color=ACCENT, thickness=1):
    return HRFlowable(width="100%", thickness=thickness, color=color, spaceAfter=6, spaceBefore=2)

def sp(h=6):
    return Spacer(1, h)

def b(text):          return Paragraph(text, body)
def bul(text):        return Paragraph(f"• {text}", bullet_style)
def sub(text):        return Paragraph(text, sub_header)
def tip(text):        return Paragraph(f"💡 {text}", tip_style)
def warn(text):       return Paragraph(f"⚠ {text}", warn_style)
def code(text):       return Paragraph(text, code_style)

def section_banner(title, bg=BLUE):
    data = [[Paragraph(f"⭐  {title}", section_header)]]
    t = Table(data, colWidths=[page_width - 4*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
        ("ROUNDEDCORNERS",(0,0), (-1,-1), [4,4,4,4]),
    ]))
    return t

def info_box(title, items, bg=LIGHT_BLUE, title_color=BLUE):
    title_style = S(f"InfoTitle_{title[:8]}",
        fontName="Helvetica-Bold", fontSize=10, textColor=title_color,
        spaceAfter=2, leading=14)
    content = [Paragraph(title, title_style)]
    for item in items:
        content.append(Paragraph(f"• {item}", bullet_style))
    data = [[content]]
    t = Table(data, colWidths=[page_width - 4*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING",   (0,0), (-1,-1), 12),
        ("RIGHTPADDING",  (0,0), (-1,-1), 12),
        ("BOX", (0,0), (-1,-1), 1, title_color),
        ("ROUNDEDCORNERS",(0,0), (-1,-1), [4,4,4,4]),
    ]))
    return t

def comparison_table(headers, rows, col_colors=None):
    header_row = [Paragraph(h, S("TH", fontName="Helvetica-Bold", fontSize=10,
                                  textColor=WHITE, alignment=TA_CENTER, leading=14))
                  for h in headers]
    body_rows = []
    for row in rows:
        body_rows.append([
            Paragraph(str(cell), S("TD", fontName="Helvetica", fontSize=9.5,
                                    textColor=GRAY_DARK, leading=14))
            for cell in row
        ])
    
    n_cols = len(headers)
    col_w = (page_width - 4*cm) / n_cols
    data = [header_row] + body_rows
    t = Table(data, colWidths=[col_w]*n_cols)
    
    style = [
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, GRAY_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.5, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]
    if col_colors:
        for ci, col_c in enumerate(col_colors):
            if col_c:
                style.append(("BACKGROUND", (ci,1), (ci,-1), col_c))
    t.setStyle(TableStyle(style))
    return t

def two_col_compare(left_title, left_items, right_title, right_items,
                    left_bg=LIGHT_BLUE, right_bg=GREEN_LIGHT,
                    left_tc=BLUE, right_tc=GREEN):
    def make_cell(title, items, bg, tc):
        ts = S(f"CC_{title[:5]}", fontName="Helvetica-Bold", fontSize=10,
               textColor=tc, spaceAfter=4, leading=14)
        bs = S(f"CB_{title[:5]}", fontName="Helvetica", fontSize=9.5,
               textColor=GRAY_DARK, spaceAfter=2, leading=13, leftIndent=8)
        content = [Paragraph(title, ts)]
        for item in items:
            content.append(Paragraph(f"• {item}", bs))
        return content

    data = [[make_cell(left_title, left_items, left_bg, left_tc),
             make_cell(right_title, right_items, right_bg, right_tc)]]
    cw = (page_width - 4*cm) / 2
    t = Table(data, colWidths=[cw, cw])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), left_bg),
        ("BACKGROUND", (1,0), (1,-1), right_bg),
        ("BOX",  (0,0), (0,-1), 1, left_tc),
        ("BOX",  (1,0), (1,-1), 1, right_tc),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
    ]))
    return t

# ── Cover Page ───────────────────────────────────────────────────────────────
def cover_page():
    els = []

    # Big blue header block
    cover_data = [[
        Paragraph("GRADE 11 CAT", S("CT1", fontName="Helvetica-Bold", fontSize=11,
                    textColor=colors.HexColor("#90CAF9"), alignment=TA_CENTER)),
        Paragraph("Paper 2 — June 2026", S("CT2", fontName="Helvetica-Bold", fontSize=26,
                    textColor=WHITE, alignment=TA_CENTER, leading=30)),
        Paragraph("COMPREHENSIVE REVISION GUIDE", S("CT3", fontName="Helvetica-Bold",
                    fontSize=13, textColor=colors.HexColor("#BBDEFB"), alignment=TA_CENTER)),
        Paragraph("Computer Applications Technology", S("CT4", fontName="Helvetica-Oblique",
                    fontSize=11, textColor=colors.HexColor("#E3F2FD"), alignment=TA_CENTER)),
    ]]
    cover_t = Table([[c] for c in cover_data[0]], colWidths=[page_width - 4*cm])
    cover_t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), NAVY),
        ("TOPPADDING",    (0,0), (-1,-1), 14),
        ("BOTTOMPADDING", (0,0), (-1,-1), 14),
        ("LEFTPADDING",   (0,0), (-1,-1), 20),
        ("RIGHTPADDING",  (0,0), (-1,-1), 20),
    ]))
    els.append(cover_t)
    els.append(sp(16))

    # Starred topics overview
    topics = [
        ("🖥", "Systems Technologies",   "RAM/ROM • SSD/HDD • Software Types • Troubleshooting"),
        ("🌐", "Internet & Networks",     "LAN/WLAN • Wired vs Wireless • Security • Email"),
        ("📋", "Information Management", "Plagiarism • Databases • Focus Questions • Surveys"),
        ("👥", "Social Implications",     "ICT Impact • RSI • AI Ethics • Big Data"),
        ("⚙", "Solution Development",   "Primary Keys • Spreadsheets • HTML • Word Styles"),
        ("🔗", "Integrated Scenarios",   "Digital Footprints • Backups • Mobile • Wi-Fi"),
    ]
    topic_rows = [[
        Paragraph(f"{icon}  {title}", S("TT", fontName="Helvetica-Bold", fontSize=10,
                    textColor=NAVY, leading=14)),
        Paragraph(desc, S("TD", fontName="Helvetica", fontSize=9, textColor=GRAY_DARK, leading=13))
    ] for icon, title, desc in topics]

    topic_t = Table(topic_rows, colWidths=[5.5*cm, page_width - 4*cm - 5.5*cm])
    topic_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [LIGHT_BLUE, WHITE]),
        ("GRID", (0,0), (-1,-1), 0.3, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(topic_t)
    els.append(sp(16))

    # Motivational note box
    note_style = S("Note", fontName="Helvetica", fontSize=10, textColor=GRAY_DARK,
                   leading=15, alignment=TA_JUSTIFY)
    note_bold  = S("NoteB", fontName="Helvetica-Bold", fontSize=10, textColor=GREEN,
                   leading=15)
    note_data = [[
        Paragraph("📚  A Note from Your Teacher", S("NTH", fontName="Helvetica-Bold",
                    fontSize=11, textColor=GREEN, spaceAfter=6, leading=16)),
        Paragraph(
            "Don't try to memorise the textbook. Revise your class notes and examples. "
            "<b>Understand the concepts</b> rather than cramming definitions. "
            "Read questions carefully and answer <b>exactly</b> what is asked. "
            "Start with the topics you know well to build confidence.",
            note_style),
        Paragraph("Many questions are based on concepts we have covered before. "
                  "Stay calm, revise consistently, and do your best. <b>You've got this! 💻📚</b>",
                  note_style),
    ]]
    flat = [[item] for item in note_data[0]]
    note_t = Table(flat, colWidths=[page_width - 4*cm])
    note_t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), GREEN_LIGHT),
        ("BOX", (0,0), (-1,-1), 1.5, GREEN),
        ("TOPPADDING",    (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING",   (0,0), (-1,-1), 14),
        ("RIGHTPADDING",  (0,0), (-1,-1), 14),
    ]))
    els.append(note_t)
    els.append(PageBreak())
    return els

# ── SECTION 1: Systems Technologies ─────────────────────────────────────────
def section_systems():
    els = []
    els.append(section_banner("SECTION 1: Systems Technologies", BLUE))
    els.append(sp(8))

    # RAM vs ROM
    els.append(sub("1.1  RAM vs ROM"))
    els.append(b("Understanding the difference between RAM and ROM is a common exam question. "
                 "Focus on the key properties of each and real-world examples."))
    els.append(sp(4))
    els.append(comparison_table(
        ["Feature", "RAM (Random Access Memory)", "ROM (Read-Only Memory)"],
        [
            ["Type of Memory", "Temporary / Primary", "Permanent / Primary"],
            ["Volatility",     "Volatile — data lost when power off", "Non-volatile — data kept without power"],
            ["Purpose",        "Stores programs & data currently in use", "Stores startup/boot instructions (BIOS/UEFI)"],
            ["Can be written to?", "Yes — constantly read & written", "No (or very limited in modern flash ROM)"],
            ["Speed",          "Very fast", "Fast but less frequently accessed"],
            ["Example",        "8 GB RAM in a laptop", "BIOS chip on motherboard"],
        ]
    ))
    els.append(sp(6))
    els.append(info_box("Key Exam Points — RAM & ROM", [
        "RAM is volatile: switching off the computer erases everything in RAM.",
        "ROM stores the BIOS/firmware — instructions the computer needs to start up.",
        "More RAM generally means the computer can run more programs at the same time.",
        "Upgrading RAM is one of the most cost-effective ways to speed up a computer.",
    ], LIGHT_BLUE, BLUE))
    els.append(sp(10))

    # SSD vs HDD
    els.append(sub("1.2  SSD vs HDD"))
    els.append(b("Both SSD and HDD are secondary storage devices. They store data permanently "
                 "even when the computer is switched off. The key differences are speed, cost, and durability."))
    els.append(sp(4))
    els.append(comparison_table(
        ["Feature", "SSD (Solid State Drive)", "HDD (Hard Disk Drive)"],
        [
            ["Speed",       "Much faster — instant access", "Slower — mechanical seek time"],
            ["Moving Parts","None (flash memory chips)", "Spinning magnetic platters + read/write arm"],
            ["Durability",  "Very durable — resistant to drops/shock", "Fragile — mechanical damage from drops"],
            ["Cost",        "More expensive per GB", "Cheaper per GB"],
            ["Noise",       "Silent", "Can produce clicking/whirring sounds"],
            ["Power Use",   "Lower power consumption", "Higher power consumption"],
            ["Lifespan",    "Limited write cycles (but long for normal use)", "Can last many years if not physically damaged"],
            ["Best For",    "Laptops, OS drives, gaming", "Large-capacity storage, backups, NAS"],
        ]
    ))
    els.append(sp(6))
    els.append(two_col_compare(
        "SSD Advantages",
        ["Faster boot and load times", "No moving parts = more durable",
         "Silent operation", "Less power = longer battery life"],
        "HDD Advantages",
        ["Cheaper for large storage", "Easier to recover data if damaged",
         "Available in very large capacities", "Suitable for long-term archiving"],
        LIGHT_BLUE, GREEN_LIGHT, BLUE, GREEN
    ))
    els.append(sp(10))

    # System vs Application Software
    els.append(sub("1.3  System Software vs Application Software"))
    els.append(sp(4))
    els.append(two_col_compare(
        "System Software",
        ["Controls and manages the hardware",
         "Provides a platform for application software",
         "Examples: Windows 11, Linux, Android, macOS",
         "Utility software: antivirus, disk cleanup, firewall",
         "Runs in the background — user rarely interacts directly"],
        "Application Software",
        ["Designed to perform specific tasks for the user",
         "Runs on top of the operating system",
         "Productivity: Microsoft Word, Excel, PowerPoint",
         "Browsers: Google Chrome, Firefox, Edge",
         "Communication: WhatsApp, Outlook, Zoom"],
        LIGHT_BLUE, ORANGE_LIGHT, BLUE, ORANGE
    ))
    els.append(sp(10))

    # Troubleshooting
    els.append(sub("1.4  Basic Troubleshooting"))
    els.append(b("When a device is not working correctly, follow a logical sequence of steps "
                 "before assuming the hardware is broken. The exam often presents a scenario "
                 "and asks which troubleshooting steps to follow."))
    els.append(sp(4))
    steps = [
        ("1", "Restart the device",         "Clears temporary errors and refreshes the OS."),
        ("2", "Check cables and connections","A loose cable is the most common hardware issue."),
        ("3", "Check the Wi-Fi connection",  "Verify the device is connected; restart router if needed."),
        ("4", "Update software / drivers",   "Outdated software often causes crashes or errors."),
        ("5", "Scan for viruses/malware",    "Malware can cause slowdowns, crashes, and data loss."),
        ("6", "Free up disk space",          "A full hard drive slows down or crashes the OS."),
        ("7", "Check Device Manager",        "Identify hardware conflicts or missing drivers."),
        ("8", "Restore to a previous state", "Use System Restore if a recent change caused the issue."),
    ]
    step_data = [[
        Paragraph(s[0], S("SN", fontName="Helvetica-Bold", fontSize=11,
                            textColor=WHITE, alignment=TA_CENTER, leading=16)),
        Paragraph(s[1], S("ST", fontName="Helvetica-Bold", fontSize=10,
                            textColor=NAVY, leading=14)),
        Paragraph(s[2], S("SD", fontName="Helvetica", fontSize=9.5,
                            textColor=GRAY_DARK, leading=14)),
    ] for s in steps]

    step_t = Table(step_data, colWidths=[1*cm, 5.5*cm, page_width - 4*cm - 6.5*cm])
    step_t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), ACCENT),
        ("ROWBACKGROUNDS", (1,0), (-1,-1), [WHITE, LIGHT_BLUE]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ALIGN", (0,0), (0,-1), "CENTER"),
    ]))
    els.append(step_t)
    els.append(PageBreak())
    return els

# ── SECTION 2: Internet and Networks ────────────────────────────────────────
def section_networks():
    els = []
    els.append(section_banner("SECTION 2: Internet and Networks", TEAL))
    els.append(sp(8))

    # LAN / WLAN
    els.append(sub("2.1  LAN and WLAN"))
    els.append(sp(4))
    els.append(comparison_table(
        ["Feature", "LAN (Local Area Network)", "WLAN (Wireless Local Area Network)"],
        [
            ["Coverage",     "Small geographic area",          "Small geographic area"],
            ["Connection",   "Uses cables (Ethernet)",         "Uses Wi-Fi (radio waves)"],
            ["Speed",        "Generally faster",               "Slightly slower due to interference"],
            ["Security",     "More secure (physical access needed)", "Less secure — signals can travel through walls"],
            ["Mobility",     "Devices must be near cable ports","Devices can move freely in range"],
            ["Examples",     "School computer lab, office",    "Home Wi-Fi, coffee shop hotspot"],
        ]
    ))
    els.append(sp(10))

    # Wired vs Wireless
    els.append(sub("2.2  Wired vs Wireless Networks"))
    els.append(sp(4))
    els.append(two_col_compare(
        "Wired (Ethernet)",
        ["Faster and more consistent speeds",
         "More reliable — no signal interference",
         "More secure — physically limited access",
         "Better for gaming, video streaming, servers",
         "Cables can be a trip hazard or limit mobility"],
        "Wireless (Wi-Fi)",
        ["Greater convenience and mobility",
         "Easy to connect new devices",
         "Can suffer interference from walls, appliances",
         "Easier to intercept (security risk)",
         "Ideal for smartphones, tablets, laptops"],
        LIGHT_BLUE, ORANGE_LIGHT, BLUE, ORANGE
    ))
    els.append(sp(10))

    # Fibre-Optic
    els.append(sub("2.3  Fibre-Optic Cables"))
    els.append(b("Fibre-optic cables transmit data as pulses of light through thin glass or "
                 "plastic fibres. They are used in high-speed internet infrastructure."))
    els.append(sp(4))
    els.append(info_box("Advantages of Fibre-Optic Cables", [
        "Extremely fast data transmission — up to hundreds of Gbps.",
        "Data can travel very long distances without signal degradation.",
        "Less interference compared to copper cables (no electromagnetic interference).",
        "More secure — very difficult to tap into the cable without detection.",
        "Supports many users simultaneously without speed loss.",
    ], TEAL_LIGHT, TEAL))
    els.append(sp(4))
    els.append(info_box("Disadvantages of Fibre-Optic Cables", [
        "More expensive to install than copper cables.",
        "Fragile — the glass fibres can break if bent sharply.",
        "Requires specialised equipment and expertise to install.",
    ], RED_LIGHT, RED))
    els.append(sp(10))

    # Password Security
    els.append(sub("2.4  Password Security and Online Safety"))
    els.append(b("Online security questions appear in almost every CAT Paper 2. "
                 "Know both the principles and specific techniques."))
    els.append(sp(4))

    security_rows = [
        ["Use strong passwords",         "At least 8–12 characters; mix uppercase, lowercase, numbers and symbols."],
        ["Avoid obvious passwords",      "Don't use your name, birthdate, or common words like 'password123'."],
        ["Two-factor authentication (2FA)", "Requires a second form of verification (e.g. OTP sent to your phone)."],
        ["Don't reuse passwords",        "If one account is hacked, all others stay safe."],
        ["Use a password manager",       "Stores and generates strong unique passwords for every site."],
        ["Lock your device",             "Use a PIN, fingerprint, or password when leaving your device unattended."],
        ["Log out of shared computers",  "Always sign out of accounts on shared or public devices."],
        ["Avoid phishing",               "Don't click suspicious links or give passwords via email."],
    ]
    sec_data = [[
        Paragraph(r[0], S("SK", fontName="Helvetica-Bold", fontSize=9.5,
                            textColor=NAVY, leading=13)),
        Paragraph(r[1], S("SV", fontName="Helvetica", fontSize=9.5,
                            textColor=GRAY_DARK, leading=13)),
    ] for r in security_rows]

    sec_t = Table(sec_data, colWidths=[5.5*cm, page_width - 4*cm - 5.5*cm])
    sec_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, LIGHT_BLUE]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(sec_t)
    els.append(sp(10))

    # Web-based email
    els.append(sub("2.5  Web-Based Email"))
    els.append(b("Web-based (webmail) services let you access email through a browser "
                 "without installing dedicated software."))
    els.append(sp(4))
    els.append(two_col_compare(
        "Advantages",
        ["Accessible from any device with internet",
         "No installation or setup required",
         "Storage is managed by the provider",
         "Automatic updates — always latest version",
         "Easy to access from different locations"],
        "Disadvantages / Risks",
        ["Requires an internet connection to access",
         "Risk of phishing and account hacking",
         "Provider can read your emails (privacy concern)",
         "If provider goes down, you lose access",
         "Spam and junk mail can be a nuisance"],
        GREEN_LIGHT, RED_LIGHT, GREEN, RED
    ))
    els.append(b("Examples: Gmail, Outlook.com, Yahoo Mail, ProtonMail"))
    els.append(PageBreak())
    return els

# ── SECTION 3: Information Management ───────────────────────────────────────
def section_info():
    els = []
    els.append(section_banner("SECTION 3: Information Management", PURPLE))
    els.append(sp(8))

    # Plagiarism
    els.append(sub("3.1  Plagiarism"))
    els.append(b("Plagiarism is the act of using someone else's work, ideas, or words without "
                 "properly acknowledging the original source. It is considered academic dishonesty."))
    els.append(sp(4))
    els.append(two_col_compare(
        "What counts as plagiarism?",
        ["Copying text from a website without citing it",
         "Paraphrasing without acknowledging the source",
         "Using images, graphs, or data without credit",
         "Submitting someone else's work as your own",
         "Forgetting to use quotation marks"],
        "How to avoid plagiarism",
        ["Reference all sources (include author, title, URL, date)",
         "Use quotation marks when using exact wording",
         "Create your own summaries and paraphrases",
         "Use a citation style (Harvard, APA, etc.)",
         "Use plagiarism-checking tools if available"],
        RED_LIGHT, GREEN_LIGHT, RED, GREEN
    ))
    els.append(sp(10))

    # Focus Questions
    els.append(sub("3.2  Focus Questions"))
    els.append(b("Focus questions guide and narrow your research so you don't waste time "
                 "on irrelevant information. A good focus question is specific, measurable, "
                 "and answerable within your scope."))
    els.append(sp(4))
    fq_data = [
        ["Too broad", "How does technology affect society?", "Hard to research — too many aspects"],
        ["Too narrow", "How many Grade 11 learners at school X own iPhones?", "Very limited use / scope"],
        ["Well-formed ✓", "How does social media use affect the academic performance of Grade 11 learners?", "Specific, researchable, measurable"],
        ["Well-formed ✓", "What are the main cybersecurity risks faced by South African businesses in 2024?", "Specific topic, clear context, researchable"],
    ]
    fq_rows = [[
        Paragraph(r[0], S("FT", fontName="Helvetica-Bold", fontSize=9.5,
                            textColor=NAVY if "✓" in r[0] else RED, leading=13)),
        Paragraph(r[1], S("FQ", fontName="Helvetica-Oblique", fontSize=9.5,
                            textColor=GRAY_DARK, leading=13)),
        Paragraph(r[2], S("FE", fontName="Helvetica", fontSize=9.5,
                            textColor=GRAY_DARK, leading=13)),
    ] for r in fq_data]

    fq_t = Table(fq_rows, colWidths=[2.5*cm, 8*cm, page_width - 4*cm - 10.5*cm])
    fq_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, LIGHT_BLUE]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(fq_t)
    els.append(sp(10))

    # Databases
    els.append(sub("3.3  Databases"))
    els.append(b("A database is an organised collection of related data. Databases make it "
                 "easy to store, retrieve, and analyse large amounts of information."))
    els.append(sp(4))
    els.append(info_box("What databases are used for", [
        "Store large amounts of structured data (e.g. student records, inventory, patient data).",
        "Search quickly using queries (e.g. find all students with a mark above 80).",
        "Generate reports (e.g. a list of top performers per class).",
        "Analyse data — identify trends, averages, totals.",
        "Reduce data duplication through normalisation.",
    ], PURPLE_LIGHT, PURPLE))
    els.append(sp(10))

    # Avoiding Bias in Surveys
    els.append(sub("3.4  Avoiding Bias in Surveys"))
    els.append(b("A biased survey produces unreliable results. When designing a survey, "
                 "take steps to ensure the data collected accurately represents reality."))
    els.append(sp(4))
    bias_rows = [
        ["Use neutral / unbiased questions",  "Don't lead the respondent toward a particular answer."],
        ["Avoid leading questions",           '"Don\'t you agree that social media is harmful?" → biased.'],
        ["Survey a wide, representative sample", "Include different ages, genders, backgrounds."],
        ["Ensure anonymity where needed",    "People answer more honestly when anonymous."],
        ["Use a large enough sample",        "Small samples may not reflect the population accurately."],
        ["Avoid double-barrelled questions", "Don't ask two things in one question."],
    ]
    bias_data = [[
        Paragraph(r[0], S("BK", fontName="Helvetica-Bold", fontSize=9.5, textColor=PURPLE, leading=13)),
        Paragraph(r[1], S("BV", fontName="Helvetica", fontSize=9.5, textColor=GRAY_DARK, leading=13)),
    ] for r in bias_rows]
    bias_t = Table(bias_data, colWidths=[6*cm, page_width - 4*cm - 6*cm])
    bias_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, PURPLE_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(bias_t)
    els.append(PageBreak())
    return els

# ── SECTION 4: Social Implications ──────────────────────────────────────────
def section_social():
    els = []
    els.append(section_banner("SECTION 4: Social Implications of ICT", ORANGE))
    els.append(sp(8))

    # ICT Impact
    els.append(sub("4.1  The Impact of ICT on Society"))
    els.append(sp(4))
    els.append(two_col_compare(
        "Positive Impacts",
        ["Faster and easier communication (email, WhatsApp, video calls)",
         "Easy access to information and online learning (e-learning)",
         "Increased productivity in business and education",
         "Online banking and e-commerce — convenient transactions",
         "Telemedicine — patients access healthcare remotely",
         "Remote work — employees can work from anywhere"],
        "Negative Impacts",
        ["Cybercrime — fraud, identity theft, hacking",
         "Privacy violations — data collected without consent",
         "Digital addiction — overuse of social media / gaming",
         "Job displacement — automation replacing human workers",
         "Cyberbullying — harassment through digital platforms",
         "Digital divide — not everyone has access to technology"],
        GREEN_LIGHT, RED_LIGHT, GREEN, RED
    ))
    els.append(sp(10))

    # RSI
    els.append(sub("4.2  RSI — Repetitive Strain Injury"))
    els.append(b("RSI is pain and damage caused by repeated movements, often affecting "
                 "the hands, wrists, arms, and neck of people who use computers for long periods."))
    els.append(sp(4))
    els.append(two_col_compare(
        "Symptoms of RSI",
        ["Pain or aching in the wrists, arms, neck or shoulders",
         "Tingling or numbness in the fingers",
         "Weakness in the hands",
         "Stiffness when moving the affected area",
         "Symptoms worsen during or after computer use"],
        "Prevention of RSI",
        ["Maintain correct posture — sit up straight, feet flat on floor",
         "Take regular breaks — rest eyes and stretch every 30–60 min",
         "Use ergonomic equipment (keyboard, mouse, chair)",
         "Position screen at eye level to avoid neck strain",
         "Adjust chair height so forearms are parallel to the desk"],
        ORANGE_LIGHT, GREEN_LIGHT, ORANGE, GREEN
    ))
    els.append(sp(10))

    # AI and Big Data Ethics
    els.append(sub("4.3  Ethical Concerns: AI and Big Data"))
    els.append(b("Artificial Intelligence (AI) and Big Data raise important ethical questions "
                 "that are increasingly relevant in modern society and in the CAT curriculum."))
    els.append(sp(4))

    ai_rows = [
        ["Privacy", "AI systems collect vast amounts of personal data. Users may not know what is collected or how it is used."],
        ["Data collection", "Big Data involves gathering data from many sources (social media, GPS, purchases) — often without users' knowledge."],
        ["Bias in AI", "AI systems trained on biased data can make unfair decisions — e.g. facial recognition that misidentifies people of colour."],
        ["Job displacement", "Automation and AI replace routine jobs, leading to unemployment in sectors like manufacturing and administration."],
        ["Lack of transparency", "AI decisions (e.g. loan approvals) are often not explainable — users don't know why they were rejected."],
        ["Surveillance", "Governments and companies can use AI to monitor citizens, raising concerns about civil liberties."],
        ["Deepfakes", "AI can generate fake videos and audio, spreading misinformation and harming reputations."],
    ]
    ai_data = [[
        Paragraph(r[0], S("AK", fontName="Helvetica-Bold", fontSize=9.5, textColor=ORANGE, leading=13)),
        Paragraph(r[1], S("AV", fontName="Helvetica", fontSize=9.5, textColor=GRAY_DARK, leading=13)),
    ] for r in ai_rows]
    ai_t = Table(ai_data, colWidths=[4.5*cm, page_width - 4*cm - 4.5*cm])
    ai_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, ORANGE_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(ai_t)
    els.append(PageBreak())
    return els

# ── SECTION 5: Solution Development ─────────────────────────────────────────
def section_solution():
    els = []
    els.append(section_banner("SECTION 5: Solution Development", GREEN))
    els.append(sp(8))

    # Primary Keys
    els.append(sub("5.1  Primary Keys in Databases"))
    els.append(b("A primary key is a field (column) that uniquely identifies each record "
                 "(row) in a database table. Every table must have a primary key."))
    els.append(sp(4))
    els.append(info_box("Properties of a Primary Key", [
        "Must be unique — no two records can have the same primary key value.",
        "Cannot be empty (NULL) — every record must have a value.",
        "Should not change — the key should remain constant over time.",
        "Usually a number (e.g. Student No, Employee ID, Order No).",
        "Enables relationships between tables (used as a foreign key in another table).",
    ], GREEN_LIGHT, GREEN))
    els.append(sp(6))

    # PK example table
    pk_header = [Paragraph(h, S("PH", fontName="Helvetica-Bold", fontSize=10,
                                  textColor=WHITE, alignment=TA_CENTER, leading=14))
                 for h in ["Student No ⭐ PK", "First Name", "Surname", "Grade"]]
    pk_rows = [pk_header] + [
        [Paragraph(str(v), S("PD", fontName="Helvetica", fontSize=9.5,
                              textColor=GRAY_DARK, alignment=TA_CENTER, leading=13))
         for v in row]
        for row in [
            ["1001", "Sipho", "Dlamini", "11"],
            ["1002", "Lerato", "Mokoena", "11"],
            ["1003", "Amelia", "Joubert", "11"],
        ]
    ]
    pk_t = Table(pk_rows, colWidths=[(page_width - 4*cm)/4]*4)
    pk_t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), GREEN),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, GREEN_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.5, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("BACKGROUND", (0,1), (0,-1), colors.HexColor("#C8E6C9")),
    ]))
    els.append(pk_t)
    els.append(sp(10))

    # Cell Referencing
    els.append(sub("5.2  Spreadsheet Cell Referencing"))
    els.append(b("Understanding cell referencing is essential for writing formulas that "
                 "behave correctly when copied to other cells."))
    els.append(sp(4))
    cr_rows = [
        ["Relative", "A1", "Both row and column change when formula is copied.",
         "=A1+B1 copied down becomes =A2+B2"],
        ["Absolute", "$A$1", "Row AND column are locked — do not change when copied.",
         "=$A$1*B2 always refers to cell A1"],
        ["Mixed (col fixed)", "$A1", "Column locked, row changes when copied.",
         "=$A1+B1 — column A stays, row changes"],
        ["Mixed (row fixed)", "A$1", "Row locked, column changes when copied.",
         "=A$1+A2 — row 1 stays, column changes"],
    ]
    cr_data = [[
        Paragraph(r[0], S("CRT", fontName="Helvetica-Bold", fontSize=9.5, textColor=NAVY, leading=13)),
        Paragraph(r[1], S("CRC", fontName="Courier-Bold", fontSize=10, textColor=GREEN, leading=13)),
        Paragraph(r[2], S("CRD", fontName="Helvetica", fontSize=9.5, textColor=GRAY_DARK, leading=13)),
        Paragraph(r[3], S("CRE", fontName="Courier", fontSize=9, textColor=GRAY_DARK, leading=13)),
    ] for r in cr_rows]
    cr_t = Table(cr_data, colWidths=[3*cm, 2*cm, 6*cm, page_width - 4*cm - 11*cm])
    cr_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, GREEN_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(cr_t)
    els.append(sp(10))

    # Functions
    els.append(sub("5.3  Key Spreadsheet Functions"))

    els.append(b("<b>IF Function</b> — returns one value if a condition is true, and another if it is false."))
    els.append(sp(2))
    els.append(info_box("IF Function — Syntax and Examples", [
        "Syntax:  =IF(condition, value_if_true, value_if_false)",
        "Example 1:  =IF(B2>=50,\"Pass\",\"Fail\")  — if mark is 50+, show Pass, else Fail.",
        "Example 2:  =IF(C3>100,\"Bonus\",\"No Bonus\")  — check if sales exceed 100.",
        "Example 3:  =IF(D2=\"Yes\",\"Active\",\"Inactive\")  — check text value.",
        "Nested IF:  =IF(A1>=75,\"Distinction\",IF(A1>=50,\"Pass\",\"Fail\"))",
    ], GREEN_LIGHT, GREEN))
    els.append(sp(6))

    els.append(b("<b>SUMIF Function</b> — adds values in a range that meet a specified condition."))
    els.append(sp(2))
    els.append(info_box("SUMIF Function — Syntax and Examples", [
        "Syntax:  =SUMIF(range, criteria, sum_range)",
        "range — the cells to check against the condition.",
        "criteria — the condition to match (e.g. \"Food\", \">50\", \"Jan\").",
        "sum_range — the cells to add if the condition is met.",
        "Example:  =SUMIF(A1:A10,\"Food\",B1:B10)  — total all amounts in column B where column A says 'Food'.",
        "Example:  =SUMIF(C1:C20,\">50\",D1:D20)  — sum values in D where C is greater than 50.",
    ], LIGHT_BLUE, BLUE))
    els.append(sp(10))

    # HTML
    els.append(sub("5.4  HTML Table Tags"))
    els.append(b("You are required to know and use the following HTML table tags. "
                 "Make sure you understand the nesting structure."))
    els.append(sp(4))
    html_rows = [
        ["&lt;table&gt; … &lt;/table&gt;",  "Defines the entire table."],
        ["&lt;tr&gt; … &lt;/tr&gt;",         "Table Row — defines one row in the table."],
        ["&lt;td&gt; … &lt;/td&gt;",         "Table Data — defines a standard cell."],
        ["&lt;th&gt; … &lt;/th&gt;",         "Table Header — bold, centred heading cell."],
    ]
    html_data = [[
        Paragraph(r[0], S("HT", fontName="Courier-Bold", fontSize=10, textColor=BLUE, leading=14)),
        Paragraph(r[1], S("HD", fontName="Helvetica", fontSize=9.5, textColor=GRAY_DARK, leading=13)),
    ] for r in html_rows]
    html_t = Table(html_data, colWidths=[7*cm, page_width - 4*cm - 7*cm])
    html_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, LIGHT_BLUE]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ("LEFTPADDING",   (0,0), (-1,-1), 10),
        ("RIGHTPADDING",  (0,0), (-1,-1), 10),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(html_t)
    els.append(sp(6))
    els.append(b("Example structure:"))
    html_ex = """\
&lt;table&gt;<br/>
&nbsp;&nbsp;&lt;tr&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Student No&lt;/th&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;Name&lt;/th&gt;<br/>
&nbsp;&nbsp;&lt;/tr&gt;<br/>
&nbsp;&nbsp;&lt;tr&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;1001&lt;/td&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Sipho&lt;/td&gt;<br/>
&nbsp;&nbsp;&lt;/tr&gt;<br/>
&lt;/table&gt;"""
    els.append(Paragraph(html_ex, code_style))
    els.append(sp(10))

    # Word Styles
    els.append(sub("5.5  Styles in Microsoft Word"))
    els.append(b("Styles are pre-defined formatting sets that you apply to text. "
                 "Using styles consistently is considered best practice."))
    els.append(sp(4))
    els.append(info_box("Why use Styles in Word?", [
        "Format headings consistently throughout a document with one click.",
        "Create an automatic Table of Contents (Insert > Table of Contents) based on heading styles.",
        "Easily change the look of the entire document by modifying a style once.",
        "Improve document structure and accessibility (screen readers use heading styles).",
        "Common styles: Heading 1, Heading 2, Normal, Title, Subtitle, Quote.",
    ], LIGHT_BLUE, BLUE))
    els.append(PageBreak())
    return els

# ── SECTION 6: Integrated Scenarios ─────────────────────────────────────────
def section_integrated():
    els = []
    els.append(section_banner("SECTION 6: Integrated Scenario Questions", NAVY))
    els.append(sp(8))

    els.append(b("Integrated scenario questions present a real-life situation and ask you to "
                 "apply knowledge from multiple sections. Below are the key concepts you need "
                 "to be able to explain in context."))
    els.append(sp(8))

    # Digital Footprint
    els.append(sub("6.1  Digital Footprint"))
    els.append(b("A digital footprint is the trail of data you leave behind whenever you use "
                 "the internet or digital devices."))
    els.append(sp(4))
    els.append(two_col_compare(
        "Active Digital Footprint",
        ["Deliberately posted content",
         "Social media posts, comments, likes",
         "Online purchases",
         "Emails and messages sent",
         "Forms and registrations completed"],
        "Passive Digital Footprint",
        ["Websites visited (stored in browser history)",
         "IP address recorded by websites",
         "Location data from apps and GPS",
         "Cookies tracking your browsing habits",
         "Search queries recorded by search engines"],
        LIGHT_BLUE, ORANGE_LIGHT, BLUE, ORANGE
    ))
    els.append(sp(4))
    els.append(info_box("Why is your digital footprint important?", [
        "Employers and universities often search applicants online — your footprint affects your reputation.",
        "Advertisers use your footprint to target you with personalised ads.",
        "Data can be hacked or leaked, leading to identity theft.",
        "Content posted online can be permanent — even deleted posts may be saved.",
    ], RED_LIGHT, RED))
    els.append(sp(10))

    # Backups
    els.append(sub("6.2  Backups"))
    els.append(b("A backup is a copy of data stored in a separate location from the original. "
                 "Backups protect against data loss."))
    els.append(sp(4))
    els.append(two_col_compare(
        "Why backups are necessary",
        ["Hardware failure (hard drive crash)",
         "Ransomware or virus attacks",
         "Accidental deletion of files",
         "Theft of device",
         "Natural disasters (fire, flood)"],
        "Where to back up",
        ["External hard drive or USB flash drive",
         "Cloud storage (Google Drive, OneDrive, Dropbox)",
         "Network Attached Storage (NAS) in business",
         "Second computer or server",
         "Optical media (less common today)"],
        ORANGE_LIGHT, LIGHT_BLUE, ORANGE, BLUE
    ))
    els.append(sp(4))
    els.append(info_box("Best Practice: The 3-2-1 Backup Rule", [
        "Keep 3 copies of your data.",
        "Store on 2 different types of media (e.g. local + cloud).",
        "Keep 1 copy offsite (e.g. cloud or at a different location).",
    ], GREEN_LIGHT, GREEN))
    els.append(sp(10))

    # Mobile Apps
    els.append(sub("6.3  Mobile Apps"))
    els.append(sp(4))
    els.append(two_col_compare(
        "Advantages of Mobile Apps",
        ["Convenient — available wherever you have your phone",
         "Portable — use on the go",
         "Often tailored to the mobile experience",
         "Push notifications keep you updated",
         "Can work offline (some apps)"],
        "Risks of Mobile Apps",
        ["Privacy concerns — apps may collect personal data",
         "Malware hidden in unofficial app stores",
         "Excessive battery and data usage",
         "Permission abuse (accessing camera, contacts, location)",
         "In-app purchases and subscription traps"],
        GREEN_LIGHT, RED_LIGHT, GREEN, RED
    ))
    els.append(sp(10))

    # Wi-Fi Security
    els.append(sub("6.4  Wi-Fi Security"))
    els.append(b("Using an unsecured Wi-Fi network exposes your data to interception. "
                 "Always take steps to secure wireless connections."))
    els.append(sp(4))
    wifi_rows = [
        ["Use WPA2 or WPA3 encryption",    "These are the strongest encryption standards for Wi-Fi. Avoid WEP (outdated and easily cracked)."],
        ["Use a strong Wi-Fi password",     "The network password should be long and complex, not the router's default."],
        ["Avoid unknown public networks",   "Public Wi-Fi hotspots (cafes, airports) may be operated by hackers ('evil twin' attacks)."],
        ["Use a VPN on public Wi-Fi",       "A Virtual Private Network encrypts your internet traffic even on unsecured networks."],
        ["Disable Wi-Fi when not in use",   "Prevents automatic connections to unknown or malicious networks."],
        ["Change default router credentials","Hackers know the default admin username and password for most routers."],
        ["Enable firewall",                 "A firewall monitors incoming and outgoing traffic and blocks suspicious connections."],
    ]
    wifi_data = [[
        Paragraph(r[0], S("WK", fontName="Helvetica-Bold", fontSize=9.5, textColor=NAVY, leading=13)),
        Paragraph(r[1], S("WV", fontName="Helvetica", fontSize=9.5, textColor=GRAY_DARK, leading=13)),
    ] for r in wifi_rows]
    wifi_t = Table(wifi_data, colWidths=[5.5*cm, page_width - 4*cm - 5.5*cm])
    wifi_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, LIGHT_BLUE]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(wifi_t)
    els.append(PageBreak())
    return els

# ── Quick Reference / Exam Tips ──────────────────────────────────────────────
def section_tips():
    els = []
    els.append(section_banner("EXAM TIPS & QUICK REFERENCE", colors.HexColor("#4A148C")))
    els.append(sp(8))

    els.append(sub("Key Definitions You Must Know"))
    els.append(sp(4))

    defs = [
        ["RAM",             "Temporary, volatile primary memory that stores currently running programs and data."],
        ["ROM",             "Permanent, non-volatile memory that stores startup/boot instructions (BIOS)."],
        ["SSD",             "Solid State Drive — secondary storage using flash memory; fast, no moving parts."],
        ["HDD",             "Hard Disk Drive — secondary storage using magnetic platters; slower but cheaper."],
        ["LAN",             "Local Area Network — network covering a small area using cables."],
        ["WLAN",            "Wireless LAN — uses Wi-Fi instead of cables."],
        ["Plagiarism",      "Using someone else's work without properly acknowledging the source."],
        ["Primary Key",     "A field that uniquely identifies each record in a database table."],
        ["RSI",             "Repetitive Strain Injury — pain caused by repeated computer use; prevented by good posture and breaks."],
        ["Digital Footprint","The trail of data left behind by a user's online activities."],
        ["Backup",          "A copy of data stored separately from the original to prevent data loss."],
        ["2FA",             "Two-Factor Authentication — requires a second form of verification beyond a password."],
        ["Firewall",        "Hardware or software that monitors and filters network traffic to block threats."],
        ["Big Data",        "Extremely large datasets analysed computationally to reveal patterns and trends."],
        ["AI (Artificial Intelligence)", "Computer systems that perform tasks normally requiring human intelligence."],
    ]
    def_data = [[
        Paragraph(d[0], S("DK", fontName="Helvetica-Bold", fontSize=9.5,
                            textColor=NAVY, leading=13)),
        Paragraph(d[1], S("DV", fontName="Helvetica", fontSize=9.5,
                            textColor=GRAY_DARK, leading=13)),
    ] for d in defs]
    def_t = Table(def_data, colWidths=[4.5*cm, page_width - 4*cm - 4.5*cm])
    def_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, PURPLE_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(def_t)
    els.append(sp(10))

    # Exam tips
    els.append(sub("Exam Strategy Tips"))
    els.append(sp(4))
    tips = [
        ("Read carefully", "Read each question at least twice before answering. Identify the command word (explain, describe, give, list, discuss)."),
        ("Answer what is asked", "If the question says 'give two reasons', give exactly two — not one, not five."),
        ("Use the mark allocation", "If a question is worth 4 marks, give 4 distinct points. One mark ≈ one fact/point."),
        ("Start with known topics", "Build confidence by answering sections you know well first."),
        ("Use CAT terminology", "Use correct technical terms — 'volatile', 'primary key', 'plagiarism' — not vague language."),
        ("Check your answers", "If time allows, re-read your answers and check spelling of key terms."),
        ("Manage your time", "Don't spend too long on one question. Move on and come back if needed."),
    ]
    tip_data = [[
        Paragraph(t[0], S("TK", fontName="Helvetica-Bold", fontSize=9.5,
                            textColor=TEAL, leading=13)),
        Paragraph(t[1], S("TV", fontName="Helvetica", fontSize=9.5,
                            textColor=GRAY_DARK, leading=13)),
    ] for t in tips]
    tip_t = Table(tip_data, colWidths=[4*cm, page_width - 4*cm - 4*cm])
    tip_t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, TEAL_LIGHT]),
        ("GRID", (0,0), (-1,-1), 0.4, GRAY_MID),
        ("TOPPADDING",    (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING",   (0,0), (-1,-1), 8),
        ("RIGHTPADDING",  (0,0), (-1,-1), 8),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ]))
    els.append(tip_t)
    els.append(sp(10))

    # Final motivation
    mot_data = [[
        Paragraph("You've got this! 💻📚", S("MH", fontName="Helvetica-Bold", fontSize=14,
                    textColor=NAVY, alignment=TA_CENTER, spaceAfter=6, leading=18)),
        Paragraph(
            "If you can confidently explain every starred section in this guide, "
            "you are well prepared for Paper 2. "
            "Stay calm, work through the paper systematically, and show what you know. "
            "Good luck! 🌟",
            S("MB", fontName="Helvetica", fontSize=10.5, textColor=GRAY_DARK,
               alignment=TA_CENTER, leading=16)),
    ]]
    flat_mot = [[item] for item in mot_data[0]]
    mot_t = Table(flat_mot, colWidths=[page_width - 4*cm])
    mot_t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), LIGHT_BLUE),
        ("BOX", (0,0), (-1,-1), 2, BLUE),
        ("TOPPADDING",    (0,0), (-1,-1), 12),
        ("BOTTOMPADDING", (0,0), (-1,-1), 12),
        ("LEFTPADDING",   (0,0), (-1,-1), 16),
        ("RIGHTPADDING",  (0,0), (-1,-1), 16),
    ]))
    els.append(mot_t)
    return els

# ── Page numbering ────────────────────────────────────────────────────────────
def add_page_number(canvas, doc):
    canvas.saveState()
    # Footer bar
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, page_width, 1.4*cm, fill=True, stroke=False)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(2*cm, 0.5*cm, "Grade 11 CAT — Paper 2 Revision Guide — June 2026")
    canvas.drawRightString(page_width - 2*cm, 0.5*cm, f"Page {doc.page}")
    # Top rule
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2)
    canvas.line(2*cm, page_height - 1.5*cm, page_width - 2*cm, page_height - 1.5*cm)
    canvas.restoreState()

# ── Build ─────────────────────────────────────────────────────────────────────
doc = SimpleDocTemplate(
    "/mnt/user-data/outputs/CAT_Paper2_Revision_Guide.pdf",
    pagesize=A4,
    topMargin=2*cm, bottomMargin=2*cm,
    leftMargin=2*cm, rightMargin=2*cm,
    title="Grade 11 CAT Paper 2 Revision Guide",
    author="CAT Department",
)

story = []
story += cover_page()
story += section_systems()
story += section_networks()
story += section_info()
story += section_social()
story += section_solution()
story += section_integrated()
story += section_tips()

doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
print("PDF created successfully!")