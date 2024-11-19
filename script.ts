class ResumeGenerator {
    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {

        const generateBtn = document.querySelector('.generate-btn') as HTMLButtonElement;
        const shareBtn = document.querySelector('.share-btn') as HTMLButtonElement;
        const downloadBtn = document.querySelector('.download-btn') as HTMLButtonElement;
        const addEducationBtn = document.querySelector('.add-btn[onclick="addEducation()"]') as HTMLButtonElement;
        const addExperienceBtn = document.querySelector('.add-btn[onclick="addExperience()"]') as HTMLButtonElement;

        if (addEducationBtn) {
            addEducationBtn.removeAttribute('onclick');
            addEducationBtn.addEventListener('click', () => this.addEducation());
        }

        if (addExperienceBtn) {
            addExperienceBtn.removeAttribute('onclick');
            addExperienceBtn.addEventListener('click', () => this.addExperience());
        }

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateResume());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareResume());
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResume());
        }
    }

    public addEducation(): void {
        const container = document.getElementById('educationEntries');
        if (!container || !container.children.length) return;

        const newEntry = container.children[0].cloneNode(true) as HTMLElement;

        newEntry.querySelectorAll('input').forEach((input: HTMLInputElement) => {
            input.value = '';
        });
        container.appendChild(newEntry);
    }

    public addExperience(): void {
        const container = document.getElementById('experienceEntries');
        if (!container || !container.children.length) return;

        const newEntry = container.children[0].cloneNode(true) as HTMLElement;

        newEntry.querySelectorAll('input, textarea').forEach((input: HTMLInputElement | HTMLTextAreaElement) => {
            input.value = '';
        });
        container.appendChild(newEntry);
    }

    private generateResume(): void {
        this.updatePersonalInfo();
        this.updateEducation();
        this.updateExperience();
        this.generateUniqueUrl();

        const resumeOutput = document.getElementById('resumeOutput');
        if (resumeOutput) {
            resumeOutput.style.display = 'block';

            resumeOutput.scrollIntoView({ behavior: 'smooth' });
        }
    }

    private updatePersonalInfo(): void {
        const name = (document.getElementById('fullName') as HTMLInputElement)?.value;
        const title = (document.getElementById('title') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
        const summary = (document.getElementById('summary') as HTMLTextAreaElement)?.value;

        if (name) document.getElementById('outputName')!.textContent = name;
        if (title) document.getElementById('outputTitle')!.textContent = title;
        if (email && phone) document.getElementById('outputContact')!.textContent = `${email} | ${phone}`;
        if (summary) document.getElementById('outputSummary')!.textContent = summary;
    }

    private updateEducation(): void {
        const educationEntries = document.getElementsByClassName('education-entry');
        const outputEducation = document.getElementById('outputEducation');
        if (!outputEducation) return;

        let educationHTML = '';
        Array.from(educationEntries).forEach((entry: Element) => {
            const degree = (entry.querySelector('.education-degree') as HTMLInputElement)?.value;
            const institution = (entry.querySelector('.education-institution') as HTMLInputElement)?.value;
            const year = (entry.querySelector('.education-year') as HTMLInputElement)?.value;

            if (degree && institution && year) {
                educationHTML += `
                    <div class="entry">
                        <h4>${degree}</h4>
                        <p>${institution}</p>
                        <p>${year}</p>
                    </div>
                `;
            }
        });

        outputEducation.innerHTML = educationHTML;
    }

    private updateExperience(): void {
        const experienceEntries = document.getElementsByClassName('experience-entry');
        const outputExperience = document.getElementById('outputExperience');
        if (!outputExperience) return;

        let experienceHTML = '';
        Array.from(experienceEntries).forEach((entry: Element) => {
            const position = (entry.querySelector('.experience-position') as HTMLInputElement)?.value;
            const company = (entry.querySelector('.experience-company') as HTMLInputElement)?.value;
            const duration = (entry.querySelector('.experience-duration') as HTMLInputElement)?.value;
            const description = (entry.querySelector('.experience-description') as HTMLTextAreaElement)?.value;

            if (position && company && duration && description) {
                experienceHTML += `
                    <div class="entry">
                        <h4>${position}</h4>
                        <p><strong>${company}</strong> | ${duration}</p>
                        <p>${description}</p>
                    </div>
                `;
            }
        });

        outputExperience.innerHTML = experienceHTML;
    }

    private generateUniqueUrl(): void {
        const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value;
        const resumeUrlElement = document.getElementById('resumeUrl');
        
        if (fullName && resumeUrlElement) {
            const username = fullName.toLowerCase().replace(/\s+/g, '-');
            const resumeUrl = `${window.location.origin}/${username}/resume`;
            resumeUrlElement.textContent = resumeUrl;
        }
    }

    private async shareResume(): Promise<void> {
        const resumeUrlElement = document.getElementById('resumeUrl');
        if (!resumeUrlElement?.textContent) return;

        try {
            await navigator.clipboard.writeText(resumeUrlElement.textContent);
            this.showSuccessMessage();

            if (navigator.share) {
                await navigator.share({
                    title: 'My Resume',
                    text: 'Check out my resume!',
                    url: resumeUrlElement.textContent
                });
            }
        } catch (error) {
            console.error('Error sharing resume:', error);
        }
    }

    private showSuccessMessage(): void {
        const successMessage = document.getElementById('copySuccess');
        if (!successMessage) return;

        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    }

    private downloadResume(): void {
        const element = document.getElementById('resumeOutput');
        if (!element) return;

        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };


        html2pdf().set(opt).from(element).save();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ResumeGenerator();
});