/**
 * Medium.AI - Client-Side Interactive AI Simulation
 * Runs directly in the browser when running on static hosts (like GitHub Pages)
 * without an active server-side proxy. Generates contextual responses based on article content.
 */

export function generateSimulatedContent(action, article, level = 'Beginner') {
  const title = article.title || 'Academic Article';
  const excerpt = article.excerpt || '';
  const textContent = Array.isArray(article.content) ? article.content.join(' ') : (article.content || excerpt);

  if (action === 'summarize' || action === 'summary') {
    return {
      summary: `In "${title}", the discussion explores essential principles for modern students and developers. The author highlights the importance of deep, structural comprehension over surface-level assumptions.\n\nStudents are encouraged to combine foundational theory with continuous experimentation, enabling them to navigate complex technical workflows with confidence.`,
      takeaways: [
        `Master the core underlying mechanisms of ${title.toLowerCase().includes('ai') ? 'AI systems' : 'the subject'} rather than relying on superficial tells.`,
        `Focus on building deep portfolio projects that demonstrate genuine technical architecture.`,
        `Develop critical analysis skills to distinguish authentic substance from hype.`,
        `Practice active recall and implementation to solidify complex technical concepts.`
      ],
      readingTimeEstimate: '3 min read'
    };
  }

  if (action === 'explain') {
    const analogies = {
      Beginner: `Think of "${title}" like learning to drive a car: you don't need to machine the engine parts from scratch, but you must understand how the steering, acceleration, and brakes coordinate together safely.`,
      Intermediate: `It operates like an orchestra conductor: each independent service or module executes its specific role, while a central coordinator synchronizes timing, state transitions, and error recovery.`,
      Advanced: `Conceptually similar to distributed consensus architectures, balancing latency tradeoffs, eventual consistency, and deterministic verification across decoupled system components.`
    };

    return {
      level,
      explanation: `At the ${level} level, "${title}" breaks down into a series of structured concepts. Rather than treating this as an abstract topic, we observe how component modularity and workflow automation solve practical bottlenecks.\n\nWhen applying these principles in real projects, starting with a clean separation of concerns and step-by-step verification allows you to master complex technical concepts without getting overwhelmed.`,
      analogy: analogies[level] || analogies.Beginner,
      keyConcepts: [
        {
          concept: 'Core Architecture',
          explanation: 'The underlying structure that connects data inputs with reliable processing logic.'
        },
        {
          concept: 'Systematic Execution',
          explanation: 'Iterative, verifiable steps that ensure predictable and reproducible outcomes.'
        },
        {
          concept: 'Practical Verification',
          explanation: 'Validating each stage against concrete benchmarks to ensure robust performance.'
        }
      ]
    };
  }

  if (action === 'quiz') {
    return {
      quizTitle: `Knowledge Check: ${title}`,
      questions: [
        {
          id: 1,
          question: `What is the central premise explored in "${title}"?`,
          options: [
            'Understanding underlying fundamentals is more valuable than superficial tells',
            'Passive consumption is sufficient for mastering complex systems',
            'Theoretical knowledge should never be tested in practice',
            'Technical tools should only be used by senior engineers'
          ],
          correctIndex: 0,
          explanation: `The article argues that genuine mastery comes from foundational understanding and practical execution, not surface-level assumptions.`
        },
        {
          id: 2,
          question: `According to the discussion, how should students approach modern technical workflows?`,
          options: [
            'Avoid hands-on coding and focus purely on memorization',
            'Build structured projects that solve real problems with measurable outcomes',
            'Wait until graduation before experimenting with new frameworks',
            'Rely exclusively on automated templates without understanding logic'
          ],
          correctIndex: 1,
          explanation: `Building substantial, verifiable projects provides deep understanding that screening bots and interviews look for.`
        },
        {
          id: 3,
          question: `Which methodology is recommended when analyzing technical claims?`,
          options: [
            'Evaluating work on its substance, merit, and factual accuracy',
            'Accepting initial assumptions without further investigation',
            'Ignoring real-world performance benchmarks',
            'Assuming complexity is always an indicator of superior quality'
          ],
          correctIndex: 0,
          explanation: `The text highlights the importance of evaluating technical work on merit, substance, and accuracy rather than preconceived biases.`
        },
        {
          id: 4,
          question: `What role does modular system design play in technical learning?`,
          options: [
            'It complicates debugging by introducing unnecessary layers',
            'It allows students to test, understand, and iterate on individual components independently',
            'It forces developers to rewrite existing modules from scratch every time',
            'It is only relevant for large-scale enterprise deployments'
          ],
          correctIndex: 1,
          explanation: `Modular architectures isolate complexity, making it easier to reason about, test, and debug each part.`
        },
        {
          id: 5,
          question: `What is the primary key takeaway for students reading this story?`,
          options: [
            'Continuous experimentation and hands-on validation lead to real competence',
            'Learning speed is more important than retention and comprehension',
            'Tools and frameworks never evolve over time',
            'Complex concepts should be avoided in undergraduate education'
          ],
          correctIndex: 0,
          explanation: `Active, hands-on experimentation combined with structured reasoning creates lasting academic and engineering skills.`
        }
      ]
    };
  }

  if (action === 'notes') {
    return {
      title: `Revision Notes: ${title}`,
      overview: `A high-yield summary of key principles, conceptual definitions, and actionable takeaways from "${title}".`,
      keyConcepts: [
        {
          term: 'Foundational Competence',
          detail: 'Building deep technical knowledge through active hands-on implementation and structured reasoning.'
        },
        {
          term: 'Systematic Evaluation',
          detail: 'Assessing engineering decisions by examining tradeoffs, architecture, and empirical outcomes.'
        },
        {
          term: 'Iterative Mastery',
          detail: 'Refining understanding through continuous experimentation, feedback loops, and peer collaboration.'
        }
      ],
      importantDefinitions: [
        {
          term: 'Agentic Loop',
          detail: 'A deterministic feedback loop where an agent plans, executes actions, and evaluates results.'
        },
        {
          term: 'Separation of Concerns',
          detail: 'A design principle for separating a computer program into distinct sections with minimal overlap.'
        },
        {
          term: 'Active Recall',
          detail: 'A learning technique that stimulates memory retrieval to strengthen neural pathways and retention.'
        },
        {
          term: 'Prompt Hygiene',
          detail: 'Structuring system prompts and context delimiters to prevent unexpected behavior and injection.'
        }
      ],
      revisionPoints: [
        `Understand the "why" and "how" behind technical decisions, not just syntax.`,
        `Build real-world multi-step projects rather than shallow tutorial clones.`,
        `Regularly self-test using comprehension quizzes and flashcard revision.`,
        `Document your learning publicly to reinforce concepts and build credibility.`,
        `Validate all external inputs and system assumptions rigorously.`
      ],
      practicalTakeaway: `Focus on mastering core fundamentals and building demonstrable projects. Real competence is built through hands-on practice, critical reasoning, and continuous experimentation.`
    };
  }

  return {};
}
