-- Insert sample scholarships
INSERT INTO public.scholarships (name, description, full_description, award_amount, deadline, grade_level, citizenship, gpa_requirement, gender, ethnicity, field, tags, application_url) VALUES
('Young Scholars Merit Award', 'A merit-based scholarship for outstanding academic achievement in STEM fields.', 'The Young Scholars Merit Award recognizes exceptional students in grades 9-10 who demonstrate outstanding academic performance in Science, Technology, Engineering, and Mathematics. Recipients receive $2,500 to support their educational journey and are invited to participate in exclusive mentorship programs with industry professionals. This scholarship is renewable for up to two years with maintained academic excellence.', '$2,500', '2025-05-15', ARRAY['9th', '10th'], ARRAY['US Citizen', 'Permanent Resident'], 3.5, ARRAY['Any'], ARRAY['Any'], ARRAY['STEM', 'Science', 'Technology'], ARRAY['merit-based', 'STEM', 'renewable'], 'https://example.com/young-scholars'),

('Future Leaders Scholarship', 'Supporting students who demonstrate exceptional leadership potential and community service.', 'The Future Leaders Scholarship is designed for middle and high school students who have shown remarkable leadership skills and dedication to community service. This $1,500 award recognizes students who have made significant contributions to their communities while maintaining strong academic performance. Recipients gain access to leadership development workshops and networking opportunities with past scholarship winners.', '$1,500', '2025-03-30', ARRAY['8th', '9th', '10th'], ARRAY['US Citizen'], 3.0, ARRAY['Any'], ARRAY['Any'], ARRAY['Leadership', 'Community Service'], ARRAY['leadership', 'community-service', 'merit-based'], 'https://example.com/future-leaders'),

('Creative Arts Excellence Award', 'Recognizing outstanding talent and achievement in creative arts disciplines.', 'The Creative Arts Excellence Award celebrates students who excel in visual arts, music, theater, creative writing, or digital media. This $2,000 scholarship supports young artists in grades 6-10 who demonstrate exceptional creativity, technical skill, and artistic vision. Winners receive mentorship from professional artists and the opportunity to showcase their work in a national exhibition.', '$2,000', '2025-04-20', ARRAY['6th', '7th', '8th', '9th', '10th'], ARRAY['US Citizen', 'Permanent Resident'], 2.8, ARRAY['Any'], ARRAY['Any'], ARRAY['Arts', 'Music', 'Theater', 'Visual Arts'], ARRAY['arts', 'creative', 'merit-based'], 'https://example.com/creative-arts');

-- Insert sample opportunities
INSERT INTO public.opportunities (name, description, full_description, location, duration, deadline, grade_level, citizenship, gpa_requirement, field, type, tags, application_url) VALUES
('NASA Summer STEM Camp', 'An intensive summer program exploring space science and engineering at NASA facilities.', 'Join NASA for an unforgettable summer experience exploring the wonders of space science and engineering. This two-week intensive program takes place at Johnson Space Center in Houston, Texas, where students work alongside NASA scientists and engineers on real space missions. Participants engage in hands-on activities including rocket design, mission planning, and astronaut training simulations. The program includes all meals, accommodation, and transportation, with no cost to participants.', 'Houston, TX', '2 weeks', '2025-02-28', ARRAY['9th', '10th'], ARRAY['US Citizen'], 3.2, ARRAY['STEM', 'Engineering', 'Science'], ARRAY['Summer Program', 'Internship'], ARRAY['NASA', 'space', 'engineering', 'free'], 'https://example.com/nasa-camp'),

('Young Entrepreneurs Bootcamp', 'A comprehensive program teaching business fundamentals and entrepreneurship skills.', 'The Young Entrepreneurs Bootcamp is a transformative 10-day program designed to introduce middle and high school students to the world of business and entrepreneurship. Located in Silicon Valley, participants learn from successful entrepreneurs, develop business plans, and pitch their ideas to real investors. The program covers topics including market research, financial planning, digital marketing, and leadership skills. All expenses are covered, including accommodation, meals, and materials.', 'Palo Alto, CA', '10 days', '2025-03-15', ARRAY['8th', '9th', '10th'], ARRAY['US Citizen', 'Permanent Resident'], 3.0, ARRAY['Business', 'Entrepreneurship'], ARRAY['Bootcamp', 'Workshop'], ARRAY['entrepreneurship', 'business', 'silicon-valley', 'free'], 'https://example.com/entrepreneurs-bootcamp'),

('Environmental Conservation Research Program', 'Hands-on research experience in environmental science and conservation efforts.', 'Join leading environmental scientists for a month-long research program focused on conservation and sustainability. Based in Yellowstone National Park, students participate in real research projects studying wildlife behavior, ecosystem dynamics, and climate change impacts. This immersive experience includes field work, data collection, laboratory analysis, and presentation of findings. Participants live in research facilities within the park and work directly with park rangers and research scientists.', 'Yellowstone National Park, WY', '4 weeks', '2025-01-31', ARRAY['9th', '10th'], ARRAY['US Citizen'], 3.3, ARRAY['Environmental Science', 'Biology', 'Conservation'], ARRAY['Research Program', 'Field Study'], ARRAY['environment', 'research', 'yellowstone', 'conservation', 'free'], 'https://example.com/environmental-research');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, content, excerpt, image_url, slug, published) VALUES
('10 Tips for Writing Winning Scholarship Essays', 'Writing a compelling scholarship essay can make the difference between receiving funding and missing out on opportunities. Here are ten proven strategies to help your essay stand out from the competition...

1. Start with a compelling hook that grabs the reader''s attention
2. Tell your unique story - what makes you different?
3. Show, don''t tell - use specific examples and anecdotes
4. Address the prompt directly and thoroughly
5. Demonstrate your passion and commitment
6. Highlight your achievements without bragging
7. Explain how the scholarship will help you achieve your goals
8. Use clear, concise language and proper grammar
9. Get feedback from teachers, counselors, or mentors
10. Proofread multiple times before submitting

Remember, scholarship committees read hundreds of essays. Make yours memorable by being authentic, specific, and passionate about your goals.', 'Learn the essential strategies for crafting scholarship essays that stand out from the competition and increase your chances of winning funding.', '/placeholder.svg?height=400&width=600', '10-tips-scholarship-essays', true),

('Understanding Merit-Based vs Need-Based Scholarships', 'When searching for scholarships, you''ll encounter two main categories: merit-based and need-based awards. Understanding the difference is crucial for targeting the right opportunities...

Merit-based scholarships are awarded based on academic achievement, special talents, leadership qualities, or other accomplishments. These scholarships focus on what you''ve achieved rather than your financial situation. Examples include academic excellence awards, athletic scholarships, and recognition for community service.

Need-based scholarships, on the other hand, are awarded based on financial need. These require documentation of family income and are designed to help students who might not otherwise afford higher education.

At MERITBASED, we focus exclusively on merit-based opportunities because we believe every student should have the chance to be recognized for their achievements, regardless of their family''s financial situation.', 'Discover the key differences between merit-based and need-based scholarships and learn which opportunities are right for you.', '/placeholder.svg?height=400&width=600', 'merit-vs-need-based-scholarships', true),

('Starting Your Scholarship Search in Middle School', 'It''s never too early to start thinking about scholarships! Middle school is the perfect time to begin building the foundation for future scholarship success...

Many students think scholarship searching begins in high school, but starting in middle school gives you a significant advantage. Here''s why and how to get started:

Why Start Early:
- More time to build a strong academic record
- Opportunity to develop leadership skills and community involvement
- Less competition for middle school-specific awards
- Time to explore interests and develop expertise

Getting Started:
1. Focus on academics - maintain strong grades
2. Get involved in extracurricular activities
3. Volunteer in your community
4. Develop special talents or skills
5. Start researching early-eligibility scholarships

Remember, the habits you build now will serve you throughout high school and beyond. Starting early gives you the best chance of scholarship success!', 'Learn why middle school is the perfect time to start your scholarship journey and get practical tips for building a strong foundation.', '/placeholder.svg?height=400&width=600', 'starting-scholarship-search-middle-school', true);
