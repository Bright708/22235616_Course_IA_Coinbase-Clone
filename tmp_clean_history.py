import pathlib

replacements = {
    'Backend/server.js': [
        ('const supabaseUrl = process.env.SUPABASE_URL || "https://htskescdtyznrisbngra.supabase.co";', 'const supabaseUrl = process.env.SUPABASE_URL;'),
        ('const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "sb_secret_ZgZV6MZhFlrPURtW0xz6mw_efXb7DGR";', 'const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;'),
        ('sb_secret_ZgZV6MZhFlrPURtW0xz6mw_efXb7DGR', 'YOUR_SUPABASE_SERVICE_KEY'),
    ],
    'Backend/.env.example': [
        ('SUPABASE_URL=https://htskescdtyznrisbngra.supabase.co', 'SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_URL.supabase.co'),
        ('SUPABASE_SERVICE_KEY=sb_secret_ZgZV6MZhFlrPURtW0xz6mw_efXb7DGR', 'SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_KEY'),
    ],
    'Frontend/.env.example': [
        ('VITE_SUPABASE_URL=https://htskescdtyznrisbngra.supabase.co', 'VITE_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_URL.supabase.co'),
        ('VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YE0qsjDyRWO16obLFJN-MQ_ojQl8eoy', 'VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY'),
    ],
}

for path, ops in replacements.items():
    p = pathlib.Path(path)
    if p.exists():
        text = p.read_text()
        for old, new in ops:
            text = text.replace(old, new)
        p.write_text(text)

for remove_path in ['Backend/.env', 'Frontend/.env']:
    p = pathlib.Path(remove_path)
    if p.exists():
        p.unlink()
