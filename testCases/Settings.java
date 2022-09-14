import static org.junit.Assert.*;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.junit.Test;

public class Settings {

	static ChromeDriver driver;
	static WebElement email, password, submit, inputDate,description,remark,amount,stgBtn,addBtn,delBtn;
	
	@BeforeClass
	public static void setup() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "/Users/rajnish/Documents/Codes/test/chromedriver100");
		driver= new ChromeDriver();
		driver.get("https://fm-cegep.vercel.app/");
		Thread.sleep(3000);
		email = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[1]/input"));
		password = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[2]/input"));
		submit = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/button"));
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("test123");
		submit.click();
		Thread.sleep(3000);
		driver.findElement(By.className("colored-icon-big-button")).click();    
	}
	
	
//	@Test
//	public void addingMonth() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("January");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("25000");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/p")).getText();
//		Assert.assertEquals("January",valid);
//	}
//	
//	@Test
//	public void addingMonthWithoutAmount() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("January");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[3]")).getText();
//		Assert.assertEquals("Please enter Amount field to save!",valid);
//	}
//	
//	@Test
//	public void addingMonthWithoutTitle() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("33333");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[3]")).getText();
//		Assert.assertEquals("Please enter Title field to save!",valid);
//	}
	
	@Test
	public void addingExpenceCategorie() throws InterruptedException {
		Thread.sleep(3000);
		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
		stgBtn.click();
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/button[2]")).click();
		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
		addBtn.click();
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("Rent");
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("350");
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/p")).getText();
		Assert.assertEquals("Rent",valid);
	}
	
	@After
	public void close() {
		driver.quit();
	}

}
