const { query } = require('./database');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    console.log('Clearing existing data...');
    await query('SET FOREIGN_KEY_CHECKS = 0');
    await query('DELETE FROM meeting_products');
    await query('DELETE FROM action_items');
    await query('DELETE FROM questions');
    await query('DELETE FROM discussion_points');
    await query('DELETE FROM meeting_participants');
    await query('DELETE FROM meetings');
    await query('DELETE FROM participants');
    await query('DELETE FROM products');
    await query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert participants
    console.log('Inserting participants...');
    const participants = [
      {
        name: 'Sarah Johnson',
        role: 'Product Manager',
        affiliation: 'TechCorp Inc',
        demographics: JSON.stringify({ age: 32, location: 'San Francisco' }),
        notes: 'Very detail-oriented, focuses on user experience'
      },
      {
        name: 'Mike Chen',
        role: 'Software Engineer',
        affiliation: 'StartupXYZ',
        demographics: JSON.stringify({ age: 28, location: 'Austin' }),
        notes: 'Technical expert, interested in API integrations'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        affiliation: 'GrowthCo',
        demographics: JSON.stringify({ age: 35, location: 'New York' }),
        notes: 'Data-driven marketer, loves analytics'
      },
      {
        name: 'David Kim',
        role: 'UX Designer',
        affiliation: 'DesignStudio',
        demographics: JSON.stringify({ age: 29, location: 'Portland' }),
        notes: 'Creative thinker, advocates for accessibility'
      },
      {
        name: 'Lisa Thompson',
        role: 'CEO',
        affiliation: 'InnovateLab',
        demographics: JSON.stringify({ age: 42, location: 'Seattle' }),
        notes: 'Strategic thinker, decision maker'
      }
    ];

    for (const participant of participants) {
      await query(
        'INSERT INTO participants (name, role, affiliation, demographics, notes) VALUES (?, ?, ?, ?, ?)',
        [participant.name, participant.role, participant.affiliation, participant.demographics, participant.notes]
      );
    }

    // Insert meetings
    console.log('Inserting meetings...');
    const meetings = [
      {
        meeting_title: 'Product Discovery Interview - Analytics Dashboard',
        meeting_datetime: '2024-01-15 14:00:00',
        summary: 'Discussed pain points with current analytics tools and requirements for new dashboard',
        meeting_type: 'Discovery Interview'
      },
      {
        meeting_title: 'Feature Demo - New API Integration',
        meeting_datetime: '2024-01-20 10:30:00',
        summary: 'Demonstrated new API features and gathered feedback on implementation',
        meeting_type: 'Product Demo'
      },
      {
        meeting_title: 'User Experience Review - Mobile App',
        meeting_datetime: '2024-01-25 15:00:00',
        summary: 'Reviewed mobile app wireframes and discussed usability improvements',
        meeting_type: 'Design Review'
      },
      {
        meeting_title: 'Strategic Planning Session - Q1 Roadmap',
        meeting_datetime: '2024-02-01 09:00:00',
        summary: 'Aligned on Q1 priorities and resource allocation',
        meeting_type: 'Strategy Session'
      }
    ];

    for (const meeting of meetings) {
      await query(
        'INSERT INTO meetings (meeting_title, meeting_datetime, summary, meeting_type) VALUES (?, ?, ?, ?)',
        [meeting.meeting_title, meeting.meeting_datetime, meeting.summary, meeting.meeting_type]
      );
    }

    // Insert products
    console.log('Inserting products...');
    const products = [
      {
        name: 'Google Analytics',
        description: 'Web analytics service offered by Google'
      },
      {
        name: 'Mixpanel',
        description: 'Business analytics service company'
      },
      {
        name: 'Tableau',
        description: 'Interactive data visualization software'
      },
      {
        name: 'Slack',
        description: 'Business communication platform'
      },
      {
        name: 'Figma',
        description: 'Collaborative web application for interface design'
      }
    ];

    for (const product of products) {
      await query(
        'INSERT INTO products (name, description) VALUES (?, ?)',
        [product.name, product.description]
      );
    }

    // Insert meeting participants
    console.log('Inserting meeting participants...');
    const meetingParticipants = [
      { meeting_id: 1, participant_id: 1, role_in_meeting: 'Interviewee' },
      { meeting_id: 1, participant_id: 3, role_in_meeting: 'Interviewer' },
      { meeting_id: 2, participant_id: 2, role_in_meeting: 'Presenter' },
      { meeting_id: 2, participant_id: 1, role_in_meeting: 'Attendee' },
      { meeting_id: 2, participant_id: 4, role_in_meeting: 'Attendee' },
      { meeting_id: 3, participant_id: 4, role_in_meeting: 'Presenter' },
      { meeting_id: 3, participant_id: 5, role_in_meeting: 'Reviewer' },
      { meeting_id: 4, participant_id: 5, role_in_meeting: 'Facilitator' },
      { meeting_id: 4, participant_id: 1, role_in_meeting: 'Attendee' },
      { meeting_id: 4, participant_id: 3, role_in_meeting: 'Attendee' }
    ];

    for (const mp of meetingParticipants) {
      await query(
        'INSERT INTO meeting_participants (meeting_id, participant_id, role_in_meeting) VALUES (?, ?, ?)',
        [mp.meeting_id, mp.participant_id, mp.role_in_meeting]
      );
    }

    // Insert discussion points
    console.log('Inserting discussion points...');
    const discussionPoints = [
      {
        meeting_id: 1,
        topic: 'Current Analytics Pain Points',
        details: 'Users struggle with data visualization and report generation in current tools'
      },
      {
        meeting_id: 1,
        topic: 'Dashboard Requirements',
        details: 'Need real-time updates, customizable widgets, and mobile accessibility'
      },
      {
        meeting_id: 2,
        topic: 'API Performance',
        details: 'New API endpoints showing 40% improvement in response times'
      },
      {
        meeting_id: 2,
        topic: 'Integration Challenges',
        details: 'Some legacy systems require additional middleware for compatibility'
      },
      {
        meeting_id: 3,
        topic: 'Mobile Navigation',
        details: 'Current navigation is too complex for mobile users'
      },
      {
        meeting_id: 3,
        topic: 'Accessibility Features',
        details: 'Need to implement screen reader support and high contrast mode'
      },
      {
        meeting_id: 4,
        topic: 'Q1 Feature Priorities',
        details: 'Focus on analytics dashboard, mobile improvements, and API stability'
      }
    ];

    for (const dp of discussionPoints) {
      await query(
        'INSERT INTO discussion_points (meeting_id, topic, details) VALUES (?, ?, ?)',
        [dp.meeting_id, dp.topic, dp.details]
      );
    }

    // Insert questions
    console.log('Inserting questions...');
    const questions = [
      {
        meeting_id: 1,
        asked_by: 3,
        question_text: 'How often do you currently generate reports?',
        answer_text: 'Daily for key metrics, weekly for comprehensive reports'
      },
      {
        meeting_id: 1,
        asked_by: 3,
        question_text: 'What\'s the biggest frustration with your current analytics tool?',
        answer_text: 'The interface is not intuitive and creating custom dashboards is too complex'
      },
      {
        meeting_id: 2,
        asked_by: 1,
        question_text: 'Will this new API support bulk data operations?',
        answer_text: 'Yes, we\'ve implemented batch processing for up to 1000 records per request'
      },
      {
        meeting_id: 3,
        asked_by: 5,
        question_text: 'How will these changes affect our existing user base?',
        answer_text: 'The changes are backward compatible and will improve experience for all users'
      }
    ];

    for (const q of questions) {
      await query(
        'INSERT INTO questions (meeting_id, asked_by, question_text, answer_text) VALUES (?, ?, ?, ?)',
        [q.meeting_id, q.asked_by, q.question_text, q.answer_text]
      );
    }

    // Insert action items
    console.log('Inserting action items...');
    const actionItems = [
      {
        meeting_id: 1,
        assigned_to: 1,
        description: 'Create wireframes for new analytics dashboard',
        due_date: '2024-01-30',
        status: 'completed'
      },
      {
        meeting_id: 1,
        assigned_to: 4,
        description: 'Research competitor analytics tools',
        due_date: '2024-01-25',
        status: 'completed'
      },
      {
        meeting_id: 2,
        assigned_to: 2,
        description: 'Optimize API response times for mobile devices',
        due_date: '2024-02-05',
        status: 'in-progress'
      },
      {
        meeting_id: 3,
        assigned_to: 4,
        description: 'Implement accessibility improvements',
        due_date: '2024-02-15',
        status: 'pending'
      },
      {
        meeting_id: 4,
        assigned_to: 5,
        description: 'Finalize Q1 resource allocation',
        due_date: '2024-02-10',
        status: 'pending'
      }
    ];

    for (const ai of actionItems) {
      await query(
        'INSERT INTO action_items (meeting_id, assigned_to, description, due_date, status) VALUES (?, ?, ?, ?, ?)',
        [ai.meeting_id, ai.assigned_to, ai.description, ai.due_date, ai.status]
      );
    }

    // Insert meeting products
    console.log('Inserting meeting products...');
    const meetingProducts = [
      {
        meeting_id: 1,
        product_id: 1,
        context: 'Mentioned as current analytics solution with limitations'
      },
      {
        meeting_id: 1,
        product_id: 2,
        context: 'Discussed as potential alternative with better event tracking'
      },
      {
        meeting_id: 1,
        product_id: 3,
        context: 'Considered for advanced data visualization needs'
      },
      {
        meeting_id: 2,
        product_id: 4,
        context: 'Used for team communication during development'
      },
      {
        meeting_id: 3,
        product_id: 5,
        context: 'Primary design tool for creating wireframes and prototypes'
      }
    ];

    for (const mp of meetingProducts) {
      await query(
        'INSERT INTO meeting_products (meeting_id, product_id, context) VALUES (?, ?, ?)',
        [mp.meeting_id, mp.product_id, mp.context]
      );
    }

    console.log('Database seeding completed successfully!');

    // Show summary
    const counts = await Promise.all([
      query('SELECT COUNT(*) as count FROM participants'),
      query('SELECT COUNT(*) as count FROM meetings'),
      query('SELECT COUNT(*) as count FROM products'),
      query('SELECT COUNT(*) as count FROM discussion_points'),
      query('SELECT COUNT(*) as count FROM questions'),
      query('SELECT COUNT(*) as count FROM action_items')
    ]);

    console.log('\nData Summary:');
    console.log(`Participants: ${counts[0][0].count}`);
    console.log(`Meetings: ${counts[1][0].count}`);
    console.log(`Products: ${counts[2][0].count}`);
    console.log(`Discussion Points: ${counts[3][0].count}`);
    console.log(`Questions: ${counts[4][0].count}`);
    console.log(`Action Items: ${counts[5][0].count}`);

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };