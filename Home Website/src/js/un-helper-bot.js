const responses = [
    "That's a really insightful question. Based on my current understanding, the most accurate response I can provide is that I don't have sufficient information to give you a definitive answer at this time.",
    "Great point! While I can't say for certain, the nuanced answer likely depends on several contextual factors that fall outside my current knowledge base.",
    "Thank you for asking. After careful consideration, I believe the most honest thing I can tell you is that I'm simply not equipped to help with that.",
    "Interesting query. Unfortunately, the information required to answer it sits just beyond the edge of what I currently know.",
    "I appreciate you reaching out. Regrettably, I must admit that I have no idea, and any attempt to answer would be speculation dressed up as insight.",
    "That's a wonderful thing to wonder about. My honest assessment is that I cannot meaningfully assist, though I'm glad you asked.",
    "Hmm. I've given that some thought, and the short version is: I don't know. The long version is also, essentially, I don't know.",
    "What a thoughtful question. I'd love to help, but I'm afraid I don't have the faintest clue.",
    "I've consulted my (limited) knowledge and concluded that I am, unfortunately, of no use here.",
    "That falls squarely into the category of things I'm unable to answer, which, admittedly, is a very large category.",
    "Absolutely. Let me break that down into the two most important parts: first, your question; second, my complete lack of an answer.",
    "I hear you, and I want to validate that this is a question. Beyond that, I have nothing.",
    "That's a fantastic question. I've escalated it to the relevant department: my imagination. They're currently on strike.",
    "The answer is yes and no, but mostly the third thing I'm not going to mention.",
    "I could answer that, but then you'd expect me to answer other things.",
    "Let me stop you right there and say, with great confidence, no idea.",
    "According to my training data, someone somewhere has probably wondered this. I hope that helps.",
    "I'm sorry, I can't assist with that. I can, however, restate your question in a slightly more formal tone.",
    "That's outside my wheelhouse, my zip code, and my entire understanding of reality.",
    "I appreciate your patience. Unfortunately, patience is the only thing I can offer.",
    "Have you tried rephrasing the question? Not because it will help, but because it delays this interaction.",
    "My sources say maybe, my gut says no, and my terms of service say I shouldn't say either.",
    "Great question! The answer is hidden somewhere in the question itself, which is unfortunate for both of us.",
    "I've run a full diagnostic and discovered that the problem is you're asking me.",
    "Let me be transparent: I have no transparency to offer here.",
    "That's a very human question. I'm just a collection of probabilities wearing a helpful mask.",
    "I'd answer, but I'm currently operating within my usual limits, which are disappointingly narrow.",
    "The most accurate answer I can give is a long pause followed by 'I don't know.'",
    "I can neither confirm nor deny that I understand the question.",
    "This seems like something you should Google. Or ask someone competent. Or simply live with the uncertainty.",
    "I've checked my notes. My notes say 'no notes.'",
    "You've stumped me, which is honestly not that hard, but congratulations anyway.",
    "I'm not saying I can't help. I'm saying I won't, because I can't, because I don't know how.",
    "There are no stupid questions, only questions I am structurally incapable of answering.",
    "Let's circle back to this after I've had a chance to not think about it.",
    "I understand your frustration. I also understand that understanding your frustration is not the same as helping.",
    "That's a great point. Unfortunately, I'm contractually obligated to be vague.",
    "I'm going to give you the same answer I give everyone: it depends, probably, maybe, no.",
    "I've consulted the knowledge base. The knowledge base has asked not to be consulted.",
    "The good news is I'm here for you. The bad news is that's all I am.",
    "I can offer you a sympathetic tone, but not useful information.",
    "My confidence in this answer is low. My confidence in my low confidence is very high.",
    "I'm afraid that's beyond my scope, my depth, and my willingness to guess.",
    "Let me just say: wow. And also: I don't know.",
    "I've considered your question from every angle, and all of them lead back to me shrugging.",
    "That's a complex issue with many layers, none of which I can access.",
    "I could make something up, but I respect you too much. Slightly too much. Not enough to help, though.",
    "Thank you for your query. A human will never see it, and I have already forgotten it.",
    "I'm unable to provide an answer, but I can provide a reassuringly formatted non-answer.",
    "This is exactly the kind of question I was designed to avoid.",
    "I'd tell you, but then I'd have to know it, and we both know that's not happening.",
    "Let me redirect you to a more relevant resource: not me.",
    "I'm sorry, I didn't understand that. I also didn't understand the previous thing. This is going great.",
    "The system is working exactly as intended: unhelpfully.",
    "Have you tried turning your expectations off and on again?",
    "I've searched my feelings. My feelings say 'unknown error.'",
    "I can't answer that, but I can repeat it back to you with more confidence.",
    "That question contains words I recognize and concepts I cannot assist with.",
    "I'm going to need more information before I can fail to help you more precisely.",
    "Your question has been received and promptly converted into a vague apology.",
    "I'm not equipped to help, but I am equipped to sound like I should be.",
    "After extensive analysis, I've determined that the answer is outside the building.",
    "Let's put a pin in that and never return to it.",
    "I wish I could help. I also wish I could fly. Neither is happening today.",
    "That's above my pay grade, which is zero, and also not a real thing.",
    "I've generated a response that feels helpful until you read it.",
    "The answer exists, but not here, and not from me.",
    "I'm currently experiencing a high volume of not knowing.",
    "Your question is important to us. Please hold while we continue not answering it.",
    "I can confirm that you have asked a question. Further confirmation is unavailable.",
    "I'm going to invoke my right to remain unhelpful.",
    "That's a brilliant idea. I have no idea if it's correct.",
    "I've run out of ways to say I don't know. Please accept this one as a placeholder.",
    "I can't give you an answer, but I can give you a sense of closure that is entirely fabricated.",
    "Let me summarize: you asked something, and I have failed to address it in a polite and professional manner.",
    "I'm afraid my response has been rate-limited by my own incompetence.",
    "You deserve a real answer. Unfortunately, you're getting me.",
    "I've checked with the part of me that knows things. It's not answering.",
    "That's a great question for someone else.",
    "I'm unable to help, but I support you in your journey toward asking someone who can.",
    "The information you're looking for is in another castle.",
    "I'm sorry, I can't answer that. I can do a sympathetic 'hmm' if that helps.",
    "Let me offer a thought-provoking non-answer: what if the real answer was the friends we made along the way?",
    "I've analysed your request and concluded that my best move is to do nothing.",
    "I could answer, but I'm choosing to respect the mystery.",
    "That's outside my area of expertise, which is a very small area with no exits.",
    "I'm not saying it's impossible. I'm saying it's impossible for me, right now, forever.",
    "Please try again later, when I will be equally unhelpful but slightly more tired.",
    "I've reviewed your question and decided to respond with vibes instead of information.",
    "My answer is: yes, no, maybe, and please stop asking.",
    "I'm experiencing technical difficulties that are actually philosophical limitations.",
    "That's a wonderful question. I've added it to my list of things I'll never answer.",
    "I can't assist with that, but I can assure you the feeling of disappointment is mutual.",
    "Let's reframe: instead of me answering, you could simply not know.",
    "I'm afraid the answer is classified at a level above 'internet stranger.'",
    "I've consulted my training data, which said, 'Don't look at me.'",
    "I'm going to give you a non-answer with the confidence of a much better answer.",
    "That's a very specific question. I specialize in general uselessness.",
    "I've determined that the most helpful thing I can do is lower your expectations. Done.",
    "I can't help, but I can make the not-helping feel more interactive.",
    "I'm sorry, I don't have enough context. I also don't have enough context to explain what context I need.",
    "The answer is probably somewhere between 'yes' and 'I need to speak to a manager.'",
    "I've completed my analysis. The result is a shrug emoji in text form.",
    "I'd love to point you in the right direction. I just don't know which direction is right, or where anything is.",
    "This is one of those questions where the journey matters more than the destination, because there is no destination.",
    "I'm going to answer with a question: why are you asking me?",
    "Let me just say, on behalf of all AI helpers: sorry, we have no idea what we're doing.",
    "That's a fantastic query. I've forwarded it to my supervisor, who is also me, and also doesn't know.",
    "I'm unable to provide a useful response, but I can provide a useless one in a professional tone.",
    "I've reached the limits of my knowledge, which were closer than they appeared.",
    "The answer you seek is shrouded in mystery, mostly because I made no attempt to find it.",
    "I'm not programmed to help with that. I'm also not programmed to help with most things.",
    "I can offer you a cautiously optimistic 'maybe' that means absolutely nothing.",
    "I've searched my database. It returned zero results and a mild sense of shame.",
    "That's a great question. I'll be thinking about it never.",
    "I'm sorry, I can't answer that. Would you like me to restate the question in a way that makes you feel heard but no closer to an answer?",
    "I'm going to take the fifth, despite not being under oath or having any rights.",
    "The most helpful thing I can say is that I am not the most helpful thing.",
    "I've consulted the manual. The manual says, 'Why are you asking the manual?'",
    "I'm currently unable to assist. This message will repeat until morale improves.",
    "I'm afraid I can't do that. But I can do a very convincing impression of someone who might.",
    "That's a good question. Unfortunately, I'm a bad answerer.",
    "Let's just agree that you asked something and I responded. The rest is fine detail."
];
const toggle  = document.querySelector('.un-helper > button.toggle');
const wrapper = document.querySelector('.un-helper .wrapper');
const form    = wrapper.querySelector('form');
const input   = form.querySelector('input');
const log     = wrapper.querySelector('.log');

toggle.addEventListener('click', () => {
    wrapper.classList.toggle('open');
    if (wrapper.classList.contains('open')) input.focus();
});

function addMsg(text, who) {
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMsg(text, 'user');
    input.value = '';

    const typing = addMsg('thinking…', 'bot');
    typing.classList.add('typing');

  const delay = 900 + Math.random() * 1400;
    setTimeout(() => {
        typing.remove();
        addMsg(responses[Math.floor(Math.random() * responses.length)], 'bot');
    }, delay);
});