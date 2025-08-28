CREATE TABLE topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    transcript TEXT,
    final_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
