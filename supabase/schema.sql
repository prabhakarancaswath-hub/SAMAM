-- SAMAM AI Supabase schema + seed
-- Generated from the existing SAMAM scholarship dataset.
-- Existing scheme facts are marked needs_verification; verify against official portals before relying on them.

create extension if not exists pgcrypto;

create table if not exists public.scholarships (
  id text primary key,
  name text not null,
  name_ta text,
  category jsonb not null default '[]'::jsonb,
  gender text not null default 'all',
  income_limit numeric not null default 0,
  education_level text,
  provider text,
  benefits text,
  benefits_ta text,
  eligibility jsonb not null default '[]'::jsonb,
  apply_link text,
  tags jsonb not null default '[]'::jsonb,
  source text,
  verification_status text not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_file text,
  source_type text not null default 'uploaded_document',
  language text not null default 'en',
  content text not null,
  verification_status text not null default 'source_document',
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  question_ta text,
  answer text not null,
  answer_ta text,
  source text,
  verification_status text not null default 'needs_verification',
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text references public.scholarships(id) on delete cascade,
  document_name text not null,
  required boolean not null default true,
  notes text
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  scholarship_id text references public.scholarships(id),
  application_reference text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.scholarships enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.faqs enable row level security;
alter table public.documents enable row level security;
alter table public.applications enable row level security;

drop policy if exists "Public can read scholarships" on public.scholarships;
create policy "Public can read scholarships" on public.scholarships for select using (true);

drop policy if exists "Public can read knowledge" on public.knowledge_documents;
create policy "Public can read knowledge" on public.knowledge_documents for select using (true);

drop policy if exists "Public can read faqs" on public.faqs;
create policy "Public can read faqs" on public.faqs for select using (true);

drop policy if exists "Public can read documents" on public.documents;
create policy "Public can read documents" on public.documents for select using (true);

insert into public.scholarships
(id,name,name_ta,category,gender,income_limit,education_level,provider,benefits,benefits_ta,eligibility,apply_link,tags,source,verification_status)
values
('1','Post Matric Scholarship for SC/ST/OBC Students','பி.எம்.எஸ் பட்டதாரி உதவித்தொகை (SC/ST/OBC)','["SC","ST","OBC"]'::jsonb,'all',250000,'post-matric','Government of Tamil Nadu','Full tuition fee + maintenance allowance up to ₹7,500/month','முழு கட்டணம் + பராமரிப்பு கொடுப்புதி மாதம் ₹7,500 வரை','["SC/ST/OBC category","Family income below ₹2.5 lakh/year","Studying post-matriculation (11th, 12th, UG, PG)"]'::jsonb,'https://scholarships.gov.in','["tamil-nadu","post-matric","sc","st","obc"]'::jsonb,'existing_samam_dataset','needs_verification'),
('2','Pre Matric Scholarship for SC/ST Students','முன் பட்டதாரி உதவித்தொகை (SC/ST)','["SC","ST"]'::jsonb,'all',200000,'pre-matric','Government of Tamil Nadu','Stipend up to ₹500/month + book grant ₹1,000/year','மாதம் ₹500 வரை உதவித்தொகை + புத்தக உதவி ₹1,000/ஆண்டு','["SC/ST category","Family income below ₹2 lakh/year","Studying class 1–10"]'::jsonb,'https://scholarships.gov.in','["tamil-nadu","pre-matric","sc","st"]'::jsonb,'existing_samam_dataset','needs_verification'),
('3','National Overseas Scholarship for SC/ST','தேசிய வெளிநாட்டு உதவித்தொகை (SC/ST)','["SC","ST"]'::jsonb,'all',600000,'postgraduate','Government of India','Up to ₹20 lakh/year for tuition + living allowance abroad','ஆண்டு ₹20 லட்சம் வரை கட்டணம் + வெளிநாட்டு வாழ்வாதார உதவி','["SC/ST category","Income below ₹6 lakh/year","Below 35 years age","Admission in foreign university"]'::jsonb,'https://scholarships.gov.in','["overseas","sc","st","postgraduate"]'::jsonb,'existing_samam_dataset','needs_verification'),
('4','Chief Minister''s Merit Scholarship','முதல்வரின் சிறப்பு உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'all',500000,'post-matric','Government of Tamil Nadu','₹5,000 to ₹15,000/year based on merit and level','ஆண்டு ₹5,000 முதல் ₹15,000 வரை தகுதியின் அடிப்படையில்','["Top scorers in board exams","Income below ₹5 lakh/year","Tamil Nadu domicile"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","merit","all-categories"]'::jsonb,'existing_samam_dataset','needs_verification'),
('5','BC/MBC Scholarship','பி.சி/எம்.பி.சி உதவித்தொகை','["BC","MBC"]'::jsonb,'all',250000,'post-matric','Government of Tamil Nadu','Tuition fee reimbursement + maintenance up to ₹5,000/month','கட்டண திரும்பப் பெறுதல் + பராமரிப்பு மாதம் ₹5,000 வரை','["BC/MBC category","Income below ₹2.5 lakh/year","Post-matric studies"]'::jsonb,'https://scholarships.gov.in','["tamil-nadu","bc","mbc","post-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('6','Indira Gandhi Single Girl Child Scholarship','இந்திரா காந்தி ஒரே பெண் குழந்தை உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'female',600000,'post-matric','CBSE / Government of India','₹500/month for 2 years (11th–12th) + tuition support','மாதம் ₹500 (11–12 வகுப்பு) + கட்டண உதவி','["Single girl child in family","Studying 11th–12th in CBSE/State board","Income below ₹6 lakh/year"]'::jsonb,'https://scholarships.gov.in','["girl-child","all-categories","pre-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('7','Tamil Nadu Higher Education Special Assistance Scheme','தமிழ்நாடு உயர்கல்வி சிறப்பு உதவித்திட்டம்','["OC","BC","MBC","SC","ST"]'::jsonb,'all',450000,'undergraduate','Government of Tamil Nadu','₹1,000/month for UG + ₹2,000/month for PG students','இளநிலை மாதம் ₹1,000 + முதுநிலை மாதம் ₹2,000','["Tamil Nadu domicile","Income below ₹4.5 lakh/year","Enrolled in UG/PG in TN govt/aided colleges"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","undergraduate","postgraduate","all-categories"]'::jsonb,'existing_samam_dataset','needs_verification'),
('8','AICTE Pragati Scholarship for Girls','ஏ.ஐ.சி.டி.இ பிரகதி பெண்கள் உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'female',800000,'undergraduate','AICTE','₹50,000/year for technical diploma/degree','ஆண்டு ₹50,000 தொழில்நுட்ப பட்டயம்/படிப்பிற்கு','["Girl student","1st year diploma/degree in AICTE-approved institute","Income below ₹8 lakh/year"]'::jsonb,'https://scholarships.gov.in','["aicte","girls","technical","undergraduate"]'::jsonb,'existing_samam_dataset','needs_verification'),
('9','AICTE Saksham Scholarship for Differently-Abled','ஏ.ஐ.சி.டி.இ சக்ஷம் மாற்றுத்திறனாளிகள் உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'all',800000,'undergraduate','AICTE','₹50,000/year for technical education','ஆண்டு ₹50,000 தொழில்நுட்ப கல்விக்கு','["40% or more disability","1st year diploma/degree in AICTE institute","Income below ₹8 lakh/year"]'::jsonb,'https://scholarships.gov.in','["aicte","disability","technical"]'::jsonb,'existing_samam_dataset','needs_verification'),
('10','National Means-cum-Merit Scholarship (NMMS)','தேசிய வாய்ப்பு-சிறப்பு உதவித்தொகை (என்.எம்.எம்.எஸ்)','["OC","BC","MBC","SC","ST"]'::jsonb,'all',150000,'pre-matric','Government of India','₹12,000/year for 4 years (class 9–12)','ஆண்டு ₹12,000, 4 ஆண்டுகள் (9–12 வகுப்பு)','["Class 8 student","Income below ₹1.5 lakh/year","Qualify NMMS exam"]'::jsonb,'https://scholarships.gov.in','["pre-matric","merit","all-categories"]'::jsonb,'existing_samam_dataset','needs_verification'),
('11','Tamil Nadu First Graduate Concession','முதல் பட்டதாரி மாணவர் கட்டண விலக்கு','["OC","BC","MBC","SC","ST"]'::jsonb,'all',0,'undergraduate','Government of Tamil Nadu','Free tuition for first graduate in family in govt/aided engineering colleges','குடும்பத்தில் முதல் பட்டதாரிக்கு அரசு/உதவி பொறியியல் கல்லூரிகளில் இலவச கட்டணம்','["First graduate in family","Tamil Nadu domicile","Admitted via TNEA counselling"]'::jsonb,'https://tneaonline.org','["tamil-nadu","first-graduate","engineering","all-categories"]'::jsonb,'existing_samam_dataset','needs_verification'),
('12','SC/ST Special Scholarship for Higher Studies','எஸ்.சி/எஸ்.டி உயர்கல்வி சிறப்பு உதவித்தொகை','["SC","ST"]'::jsonb,'all',500000,'postgraduate','Government of Tamil Nadu','Full tuition + ₹5,000/month maintenance for PG studies','முழு கட்டணம் + மாதம் ₹5,000 பராமரிப்பு முதுநிலை படிப்பிற்கு','["SC/ST category","Income below ₹5 lakh/year","PG admission in recognized institute"]'::jsonb,'https://scholarships.gov.in','["sc","st","postgraduate","tamil-nadu"]'::jsonb,'existing_samam_dataset','needs_verification'),
('13','Begum Hazrat Mahal National Scholarship for Girls','பேகம் ஹஸ்ரத் மஹால் தேசிய பெண்கள் உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'female',200000,'pre-matric','Maulana Azad Education Foundation','₹5,000 for class 9–10, ₹6,000 for class 11–12','9–10 வகுப்பிற்கு ₹5,000, 11–12 வகுப்பிற்கு ₹6,000','["Minority girl student","Income below ₹2 lakh/year","Class 9–12"]'::jsonb,'https://scholarships.gov.in','["minority","girls","pre-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('14','Pre-Matric Scholarship for Minorities','சிறுபான்மை மாணவர்கள் முன் பட்டதாரி உதவித்தொகை','["OC","BC","MBC"]'::jsonb,'all',100000,'pre-matric','Government of India','₹1,000–₹10,700/year based on class level','வகுப்பின் அடிப்படையில் ஆண்டு ₹1,000–₹10,700','["Minority community","Income below ₹1 lakh/year","Class 1–10"]'::jsonb,'https://scholarships.gov.in','["minority","pre-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('15','Post-Matric Scholarship for Minorities','சிறுபான்மை மாணவர்கள் பட்டதாரி உதவித்தொகை','["OC","BC","MBC"]'::jsonb,'all',200000,'post-matric','Government of India','Up to ₹20,000/year for tuition + maintenance','கட்டணம் + பராமரிப்பு ஆண்டு ₹20,000 வரை','["Minority community","Income below ₹2 lakh/year","Post-matric studies"]'::jsonb,'https://scholarships.gov.in','["minority","post-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('16','Central Sector Scheme of Scholarships for College Students','மத்திய துறை கல்லூரி மாணவர்கள் உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'all',450000,'undergraduate','Government of India','₹1,000/month for UG, ₹2,000/month for PG (up to 10 months/year)','இளநிலை மாதம் ₹1,000, முதுநிலை மாதம் ₹2,000 (ஆண்டு 10 மாதங்கள்)','["80%+ in 12th board","Income below ₹4.5 lakh/year","Regular UG/PG student"]'::jsonb,'https://scholarships.gov.in','["central","undergraduate","postgraduate","merit"]'::jsonb,'existing_samam_dataset','needs_verification'),
('17','Tamil Nadu 7.5% Horizontal Reservation (Govt School Students)','தமிழ்நாடு 7.5% கிடைமட்ட இட ஒதுக்கீடு (அரசு பள்ளி மாணவர்கள்)','["OC","BC","MBC","SC","ST"]'::jsonb,'all',0,'undergraduate','Government of Tamil Nadu','Guaranteed admission in medical/engineering for govt school toppers','அரசு பள்ளி மாணவர்களுக்கு மருத்துவ/பொறியியல் உறுதி சேர்க்கை','["Studied 6–12 in TN govt school","Qualified NEET/TNEA","Applied via counselling"]'::jsonb,'https://tneaonline.org','["tamil-nadu","govt-school","engineering","medical","reservation"]'::jsonb,'existing_samam_dataset','needs_verification'),
('18','INSPIRE Scholarship (Science Students)','இன்ஸ்பயர் உதவித்தொகை (அறிவியல் மாணவர்கள்)','["OC","BC","MBC","SC","ST"]'::jsonb,'all',0,'undergraduate','Department of Science & Technology','₹80,000/year for 5 years (BSc/MSc in natural sciences)','ஆண்டு ₹80,000, 5 ஆண்டுகள் (இயற்பியல் அறிவியல் BSc/MSc)','["Top 1% in 12th board or JEE rank < 10,000","Pursuing BSc/MSc in natural/basic sciences","Age 17–22"]'::jsonb,'https://scholarships.gov.in','["science","inspire","undergraduate","merit"]'::jsonb,'existing_samam_dataset','needs_verification'),
('19','PG Indira Gandhi Scholarship for Single Girl Child','இந்திரா காந்தி முதுநிலை உதவித்தொகை (ஒரே பெண் குழந்தை)','["OC","BC","MBC","SC","ST"]'::jsonb,'female',0,'postgraduate','UGC','₹36,200/year for 2 years of PG','ஆண்டு ₹36,200, 2 ஆண்டுகள் முதுநிலை படிப்பிற்கு','["Single girl child","Admitted to PG course","Age below 30"]'::jsonb,'https://scholarships.gov.in','["ugc","girls","postgraduate","single-girl"]'::jsonb,'existing_samam_dataset','needs_verification'),
('20','Tamil Nadu Adi Dravidar Welfare Scholarship','தமிழ்நாடு அடிதிராவிடர் நல உதவித்தொகை','["SC"]'::jsonb,'all',200000,'pre-matric','Government of Tamil Nadu','Free education + ₹500/month + books + uniform','இலவச கல்வி + மாதம் ₹500 + புத்தகம் + சீருடை','["SC category","Income below ₹2 lakh/year","Class 1–12 in TN"]'::jsonb,'https://scholarships.gov.in','["tamil-nadu","sc","pre-matric","adi-dravidar"]'::jsonb,'existing_samam_dataset','needs_verification'),
('21','Tamil Nadu Tribal Welfare Scholarship','தமிழ்நாடு பழங்குடி நல உதவித்தொகை','["ST"]'::jsonb,'all',200000,'pre-matric','Government of Tamil Nadu','Free education + boarding + books + ₹600/month','இலவச கல்வி + வசதி + புத்தகம் + மாதம் ₹600','["ST category","Income below ₹2 lakh/year","Class 1–12 in TN"]'::jsonb,'https://scholarships.gov.in','["tamil-nadu","st","pre-matric","tribal"]'::jsonb,'existing_samam_dataset','needs_verification'),
('22','Ishan Uday Scholarship for North East Students','ஈஷான் உதய் வடகிழக்கு மாணவர்கள் உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'all',450000,'undergraduate','UGC','₹5,400/month (UG general), ₹7,800/month (PG/technical)','இளநிலை மாதம் ₹5,400, முதுநிலை/தொழில்நுட்ப மாதம் ₹7,800','["Domicile of North East states","Income below ₹4.5 lakh/year","1st year UG/PG"]'::jsonb,'https://scholarships.gov.in','["north-east","ugc","undergraduate"]'::jsonb,'existing_samam_dataset','needs_verification'),
('23','Post-Matric Scholarship for OBC Students (Central)','பி.எம்.எஸ் பிற பிற்படு வகுப்பினர் உதவித்தொகை (மத்திய)','["BC","OBC"]'::jsonb,'all',150000,'post-matric','Government of India','Tuition + maintenance up to ₹7,500/month','கட்டணம் + பராமரிப்பு மாதம் ₹7,500 வரை','["OBC category","Income below ₹1.5 lakh/year","Post-matric studies"]'::jsonb,'https://scholarships.gov.in','["obc","central","post-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('24','PG Scholarship for Professional Courses (SC/ST)','தொழில்முறை முதுநிலை உதவித்தொகை (SC/ST)','["SC","ST"]'::jsonb,'all',600000,'postgraduate','Government of India','₹3,000/month (ME/MTech) or ₹4,500/month (MPhil/PhD)','மாதம் ₹3,000 (ME/MTech) அல்லது ₹4,500 (MPhil/PhD)','["SC/ST category","Income below ₹6 lakh/year","PG in professional courses"]'::jsonb,'https://scholarships.gov.in','["sc","st","postgraduate","professional"]'::jsonb,'existing_samam_dataset','needs_verification'),
('25','Swami Vivekananda Merit-cum-Means Scholarship','சுவாமி விவேகானந்தர் தகுதி-வருமான உதவித்தொகை','["OC","BC","MBC","SC","ST"]'::jsonb,'all',250000,'post-matric','Government of Tamil Nadu','₹1,500–₹5,000/month based on education level','கல்வி நிலையின் அடிப்படையில் மாதம் ₹1,500–₹5,000','["Merit in last exam (60%+)","Income below ₹2.5 lakh/year","Class 11 to PG"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","merit","all-categories","post-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('26','Tamil Nadu Free Education for Girls (Beti Bachao)','தமிழ்நாடு பெண்கள் இலவச கல்வி (பேட்டி பசாவ்)','["OC","BC","MBC","SC","ST"]'::jsonb,'female',300000,'pre-matric','Government of Tamil Nadu','Free education up to degree + ₹1,500/year for books','பட்டம் வரை இலவச கல்வி + ஆண்டு ₹1,500 புத்தக உதவி','["Girl student","Income below ₹3 lakh/year","Class 1 to UG in TN"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","girls","pre-matric","beti-bachao"]'::jsonb,'existing_samam_dataset','needs_verification'),
('27','Kanya Sumangala Yojana (UP-origin TN students)','கன்யா சுமங்கலா திட்டம்','["OC","BC","MBC","SC","ST"]'::jsonb,'female',300000,'pre-matric','Government of Uttar Pradesh','Total ₹25,000 in installments from birth to UG','பிறப்பு முதல் இளநிலை வரை மொத்தம் ₹25,000 தவணைகளில்','["Girl child","UP domicile (transferable)","Income below ₹3 lakh/year"]'::jsonb,'https://myscheme.gov.in','["girls","pre-matric","kanya-sumangala"]'::jsonb,'existing_samam_dataset','needs_verification'),
('28','Tamil Nadu Backward Classes Economic Support','தமிழ்நாடு பிற பிற்படு வகுப்பினர் பொருளாதார உதவி','["BC","MBC"]'::jsonb,'all',300000,'undergraduate','Government of Tamil Nadu','₹8,000/year for UG + exam fee reimbursement','இளநிலை ஆண்டு ₹8,000 + தேர்வு கட்டண திரும்பப் பெறுதல்','["BC/MBC category","Income below ₹3 lakh/year","UG in TN govt/aided college"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","bc","mbc","undergraduate"]'::jsonb,'existing_samam_dataset','needs_verification'),
('29','Dr. Ambedkar Scholarship for DNT Students','டாக்டர் அம்பேத்கர் டி.என்.டி மாணவர்கள் உதவித்தொகை','["OC"]'::jsonb,'all',200000,'post-matric','Government of India','Tuition + maintenance up to ₹5,000/month','கட்டணம் + பராமரிப்பு மாதம் ₹5,000 வரை','["Denotified tribe (DNT)","Income below ₹2 lakh/year","Post-matric studies"]'::jsonb,'https://scholarships.gov.in','["dnt","post-matric","ambedkar"]'::jsonb,'existing_samam_dataset','needs_verification'),
('30','Tamil Nadu Free Laptop Scheme for Students','தமிழ்நாடு இலவச மடிக்கணினி திட்டம்','["OC","BC","MBC","SC","ST"]'::jsonb,'all',0,'post-matric','Government of Tamil Nadu','Free laptop for +2 students in govt/aided schools','அரசு/உதவி பள்ளி +2 மாணவர்களுக்கு இலவச மடிக்கணினி','["Studying +2 in TN govt/aided school","All categories","Tamil Nadu domicile"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","laptop","all-categories","post-matric"]'::jsonb,'existing_samam_dataset','needs_verification'),
('31','Tamil Nadu Higher Education Assurance Scheme','தமிழ்நாடு உயர்கல்வி உறுதி திட்டம்','["OC","BC","MBC","SC","ST"]'::jsonb,'all',600000,'undergraduate','Government of Tamil Nadu','₹15,000/year + bus pass for college students','ஆண்டு ₹15,000 + கல்லூரி மாணவர் பேருந்து பாஸ்','["Tamil Nadu domicile","Income below ₹6 lakh/year","UG in TN govt/aided colleges"]'::jsonb,'https://myscheme.gov.in','["tamil-nadu","undergraduate","all-categories"]'::jsonb,'existing_samam_dataset','needs_verification')
on conflict (id) do update set
name=excluded.name,name_ta=excluded.name_ta,category=excluded.category,gender=excluded.gender,
income_limit=excluded.income_limit,education_level=excluded.education_level,provider=excluded.provider,
benefits=excluded.benefits,benefits_ta=excluded.benefits_ta,eligibility=excluded.eligibility,
apply_link=excluded.apply_link,tags=excluded.tags,source=excluded.source,
verification_status=excluded.verification_status,updated_at=now();

insert into public.knowledge_documents (title, source_file, source_type, language, content, verification_status)
select 'BC/MBC Scholarship Guidelines', 'BC MBC - Fresh form.pdf', 'uploaded_document', 'en',
'This uploaded guideline states that regular students who meet the scholarship eligibility criteria can apply for private and government/welfare scholarships, subject to the respective scholarship conditions. It also lists government quota students as eligible to apply for community scholarships including FG, BC, DNC, SC and PMSS, while management quota eligibility differs. Existing scholarship or financial assistance must be disclosed and combination rules must be checked.',
'source_document'
where not exists (
  select 1 from public.knowledge_documents where title='BC/MBC Scholarship Guidelines'
);

insert into public.knowledge_documents (title, source_file, source_type, language, content, verification_status)
select 'BC/MBC Scholarship Notes', 'Scholarship Application Guidelines tc.pdf', 'uploaded_document', 'en',
'The uploaded scholarship guideline says active scholarship opportunities are shared periodically as concerned agencies release official scholarship announcements. It also says government schemes in the NSP portal are subject to the stated one-scholarship application condition in the document.',
'source_document'
where not exists (
  select 1 from public.knowledge_documents where title='BC/MBC Scholarship Notes'
);
